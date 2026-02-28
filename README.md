# 🏆 Gestor de Golejadors - AEA04 Full Stack Nuxt
---

### 1. Posada en marxa

```markdown
## 🚀 Passos per posar en marxa el projecte

### 1. Clonar o descarregar el projecte
Assegura't d'estar a la carpeta arrel del projecte `AEA04-FULL-STACK-NUXT`.

### 2. Instal·lació de dependències
Executa la següent comanda al teu terminal per instal·lar tots els paquets necessaris:

npm install

```

### 2. Variables d'entorn

Crea un fitxer anomenat **`.env`** a l'arrel del projecte i afegeix-hi les claus necessàries per a l'autenticació i la sessió. Per exemple:

```env
# Sessió de l'usuari (pots posar qualsevol text llarg aleatori)
NUXT_SESSION_PASSWORD=una_contrasenya_molt_llarga_i_segura_de_32_caracters

# Si utilitzes GitHub Login, afegeix aquestes (opcional per a local)
NUXT_OAUTH_GITHUB_CLIENT_ID=el_teu_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=el_teu_client_secret

```

### 3. Preparar la Base de Dades

Com que el projecte utilitza Drizzle amb SQLite, cal crear la base de dades i aplicar l'esquema definit:

```bash
# Crea la carpeta de dades si no existeix
mkdir .data

# Empeny l'esquema de Drizzle a la base de dades local
npx drizzle-kit push

```

### 4. Executar el projecte en mode desenvolupament

Un cop tot estigui configurat, aixeca el servidor de desenvolupament:

```bash
npm run dev

```

L'aplicació estarà disponible a [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 📊 Gestió de dades (Drizzle Studio)

Si vols veure i editar les dades de la base de dades des d'una interfície gràfica, executa:

```bash
npx drizzle-kit studio

```

*Nota: Si tens problemes de connexió a casa amb el navegador, recorda desactivar la flag de Chrome `block-insecure-private-network-requests`.*

## 📂 Estructura del Projecte

* `/app/pages`: Conté les vistes (Login, Register, Admin, Crear, Modificar).
* `/server/api`: Lògica del backend i endpoints del CRUD.
* `/server/db`: Configuració de la base de dades i definició de l'esquema (`schema.ts`).
