import json
from app.models.credentials import Credentials
from Crypto.PublicKey import RSA

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

    

