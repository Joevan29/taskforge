-- TaskForge Database README
-- ============================================================

Cara setup database TaskForge di PostgreSQL lokal:

1. Install PostgreSQL dari: https://www.postgresql.org/download/windows/
2. Buka pgAdmin atau psql
3. Buat database baru:
   CREATE DATABASE taskforge;
4. Hubungkan ke database taskforge
5. Jalankan file 01_schema.sql
6. Jalankan file 02_seed.sql

Akun demo setelah seed:
- Email: budi@taskforge.com   | Password: password123 | Role: Admin/PM
- Email: rina@taskforge.com   | Password: password123 | Role: Member/Teknisi
- Email: dino@taskforge.com   | Password: password123 | Role: Owner
- Email: ahmad@taskforge.com  | Password: password123 | Role: Member/Dev
- Email: siti@taskforge.com   | Password: password123 | Role: Member/Designer

Connection string untuk .NET backend (appsettings.json):
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=taskforge;Username=postgres;Password=YOUR_PASSWORD"
}

Connection string untuk Next.js (.env.local):
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskforge"
