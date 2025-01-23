from pymongo import MongoClient
import colorsys
import random
from datetime import datetime
import argparse

# Connexion à MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['colorpalette']
collection = db['palettes']

# Liste des tags possibles
possible_tags = [
    'minimaliste', 'coloré', 'sombre', 'clair', 'pastel',
    'vintage', 'moderne', 'élégant', 'fun', 'professionnel',
    'artistique', 'chaleureux', 'froid', 'automne', 'printemps',
    'été', 'blanc'
]

def hsv_to_hex(h, s, v):
    """Convertit des valeurs HSV en code hexadécimal"""
    rgb = tuple(round(i * 255) for i in colorsys.hsv_to_rgb(h, s, v))
    return '#{:02x}{:02x}{:02x}'.format(*rgb)

def get_random_tags(count):
    """Retourne un nombre spécifique de tags aléatoires"""
    return random.sample(possible_tags, count)

def generate_monochromatic():
    """Génère une palette monochromatique"""
    hue = random.random()
    colors = []
    for i in range(5):
        value = 0.2 + (i * 0.15)  # Variation de la luminosité
        colors.append(hsv_to_hex(hue, 0.6, value))
    return {
        'colors': colors,
        'tags': ['monochrome'] + get_random_tags(1),
        'createdAt': datetime.utcnow()
    }

def generate_analogous():
    """Génère une palette de couleurs analogues"""
    base_hue = random.random()
    colors = []
    for i in range(-2, 3):
        hue = (base_hue + (i * 0.083)) % 1  # 30 degrés en proportion (30/360)
        colors.append(hsv_to_hex(hue, 0.6, 0.7))
    return {
        'colors': colors,
        'tags': ['analogue'] + get_random_tags(1),
        'createdAt': datetime.utcnow()
    }

def generate_complementary():
    """Génère une palette de couleurs complémentaires"""
    base_hue = random.random()
    complement_hue = (base_hue + 0.5) % 1
    colors = []
    
    # Couleur de base et variations
    for i in range(3):
        value = 0.3 + (i * 0.2)
        colors.append(hsv_to_hex(base_hue, 0.6, value))
    
    # Couleur complémentaire et variation
    for i in range(2):
        value = 0.4 + (i * 0.2)
        colors.append(hsv_to_hex(complement_hue, 0.6, value))
    
    return {
        'colors': colors,
        'tags': ['complémentaire'] + get_random_tags(1),
        'createdAt': datetime.utcnow()
    }

def generate_triadic():
    """Génère une palette de type triade"""
    base_hue = random.random()
    hue2 = (base_hue + 0.333) % 1
    hue3 = (base_hue + 0.666) % 1
    colors = []
    
    # Une couleur de chaque triade avec variations
    for hue in [base_hue, hue2, hue3]:
        for i in range(2):
            value = 0.4 + (i * 0.2)
            colors.append(hsv_to_hex(hue, 0.6, value))
    
    return {
        'colors': colors[:5],  # On garde seulement 5 couleurs maximum
        'tags': ['triade'] + get_random_tags(1),
        'createdAt': datetime.utcnow()
    }

def generate_random_palette():
    """Génère une palette aléatoire selon une des règles"""
    generators = [
        generate_monochromatic,
        generate_analogous,
        generate_complementary,
        generate_triadic
    ]
    return random.choice(generators)()

def seed_database(nb_palettes):
    """Ajoute le nombre spécifié de palettes à la base de données"""
    try:
        # Génère les nouvelles palettes
        palettes = [generate_random_palette() for _ in range(nb_palettes)]
        
        # Ajoute les nouvelles palettes
        collection.insert_many(palettes)
        print(f'{nb_palettes} nouvelles palettes ont été ajoutées à la base de données')

    except Exception as e:
        print('Erreur lors du seed de la base de données:', str(e))
    finally:
        client.close()

if __name__ == '__main__':
    # Configuration du parser d'arguments
    parser = argparse.ArgumentParser(description='Génère des palettes de couleurs harmonieuses')
    parser.add_argument('--nombre', '-n', type=int, default=20,
                      help='Nombre de palettes à générer (défaut: 20)')
    
    # Récupération des arguments
    args = parser.parse_args()
    
    # Lancement du seed avec le nombre spécifié
    seed_database(args.nombre)
