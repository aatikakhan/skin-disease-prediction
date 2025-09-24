# Training only for 3 diseases: Melanoma, Benign, Carcinoma
import pandas as pd
import os
import shutil
from sklearn.model_selection import train_test_split

# Paths (update if needed)
metadata_path = '/Users/ak/TFox/college/skin-disease-prediction/training/archive/HAM10000_metadata.csv'
image_dir = '/Users/ak/TFox/college/skin-disease-prediction/training/archive'
output_dir = '/Users/ak/TFox/college/skin-disease-prediction/training/data'

# Read CSV — pandas will detect header automatically
df = pd.read_csv(metadata_path)

# Map diagnosis codes to labels
label_map = {
    'mel': 'Melanoma',
    'nv': 'Benign',
    'bkl': 'Benign',
    'df': 'Benign',
    'vasc': 'Benign',
    'bcc': 'Carcinoma',
    'akiec': 'Carcinoma'
}

df['label'] = df['dx'].map(label_map)

# Check for unmapped diagnosis codes and drop those rows
missing_labels = df[df['label'].isna()]['dx'].unique()
if len(missing_labels) > 0:
    print("⚠️ Unmapped diagnosis codes found and removed:", missing_labels)
df = df.dropna(subset=['label'])

# Split into train and validation sets
train_df, val_df = train_test_split(df, test_size=0.2, stratify=df['label'], random_state=42)

def copy_images(dataframe, subset):
    for _, row in dataframe.iterrows():
        filename = row['image_id'] + '.jpg'
        label = row['label']
        dest_dir = os.path.join(output_dir, subset, label)
        os.makedirs(dest_dir, exist_ok=True)

        # Look in both image parts
        part1 = os.path.join(image_dir, 'HAM10000_images_part_1', filename)
        part2 = os.path.join(image_dir, 'HAM10000_images_part_2', filename)

        if os.path.exists(part1):
            src_path = part1
        elif os.path.exists(part2):
            src_path = part2
        else:
            print(f"⚠️ Image not found: {filename}")
            continue

        dst_path = os.path.join(dest_dir, filename)
        shutil.copyfile(src_path, dst_path)

# Copy images
copy_images(train_df, 'train')
copy_images(val_df, 'val')

print("✅ Dataset prepared successfully:")
print(f"- Training data: {os.path.join(output_dir, 'train')}")
print(f"- Validation data: {os.path.join(output_dir, 'val')}")


