import json
import base64
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from app.services.users import get_user_rsa_key_pair
from app.models.credentials import Credentials

def generate_rsa_key_pair_as_json() -> dict:
    """
    Generate a new RSA public/private key pair.

    Returns:
        dict: A dictionary with two keys:
            - "private_key" (str): The PEM-encoded RSA private key.
            - "public_key" (str): The PEM-encoded RSA public key.
    """
    # Generate 2048-bit RSA key pair
    key = RSA.generate(2048)

    # Export keys in PEM format
    private_key_pem = key.export_key().decode('utf-8')
    public_key_pem = key.publickey().export_key().decode('utf-8')

    # Format as JSON
    key_pair_dict = {
        "private_key": private_key_pem,
        "public_key": public_key_pem
    }

    return key_pair_dict


def generate_signature(user_id: int, payload: dict) -> str:
    """
    Generates a digital signature for the payload of the credential.
    This is done by hashing the payload and encrypting it with the user's Private Key.

    Args:
        payload: The dynamic values user added for the credential
    
    Returns:
        signature: The encrypted hash that will be used to verify the credential
    """

    public_key, private_key = get_user_rsa_key_pair(user_id)
    
    # Load keys from strings (PEM format)
    private_key = RSA.import_key(private_key)
    public_key = RSA.import_key(public_key)

    # hash the payload
    payload_hash = SHA256.new(json.dumps(payload, sort_keys=True).encode())

    # Sign the hash
    signature_bytes = pkcs1_15.new(private_key).sign(payload_hash)

    # encode signature as base64 string for easier transfer and storing
    signature = base64.b64encode(signature_bytes).decode()

    return signature


def verify_signature(credential: Credentials) -> tuple[bool, str]:
    """
    Verifies the credential by creating the hash of the credential payload and comparing it with the hash that is encrpted in the signature of the credential

    Args:
        credential: The credential object containing the user defined payload and the digital signature

    Return:
        bool: True if the signature is valid and matches the payload; False otherwise.
    """

    # The issuer_id is the user_id whose public and private key pair was used to sign the credntial payload
    issuer_id = credential.issuer_id

    public_key, private_key = get_user_rsa_key_pair(issuer_id)

    # Load keys from strings (PEM format)
    private_key = RSA.import_key(private_key)
    public_key = RSA.import_key(public_key)

    signature = credential.signature

    # Decode signature from base64
    signature_bytes = base64.b64decode(signature)

    payload = credential.payload

    # hash the payload
    payload_hash = SHA256.new(json.dumps(payload, sort_keys=True).encode())

    try:
        pkcs1_15.new(public_key).verify(payload_hash, signature_bytes)
        return True, None
    except (ValueError, TypeError):
        return False, "The payload hash does not match the digital signature."