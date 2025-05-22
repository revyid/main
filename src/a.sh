#!/bin/bash

# Hapus file a.txt jika sudah ada sebelumnya
rm -f a.txt

# Mencari semua file .ts dan .tsx di direktori saat ini dan subdirektori
find ./ -type f -name "*.ts" -o -name "*.tsx" | sort | while read -r file; do
  # Tambahkan path file sebagai komentar
  echo -e "// path = $file\n" >>a.txt

  # Tambahkan isi file
  cat "$file" >>a.txt

  # Tambahkan baris kosong sebagai pemisah antar file
  echo -e "\n\n" >>a.txt
done

echo "Semua file .ts dan .tsx telah dikumpulkan dalam a.txt"
