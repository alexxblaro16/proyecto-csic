# Guía del equipo Front End — Proyecto CSIC

> **Lead:** Alejandro
> **Equipo:** Kevin, Andrea, Gabriel
> **Repo de trabajo:** https://github.com/alexxblaro16/proyecto-csic (fork de Alejandro)
> **Repo original (NO TOCAR):** https://github.com/PRNovoa/proyecto-csic

---

## Resumen en 30 segundos

1. Trabajamos en **MI FORK**, no en el original.
2. Cada uno tiene **SU rama propia y fija**:
   - Kevin → rama `kevin`
   - Andrea → rama `andrea`
   - Gabriel → rama `gabriel`
3. **NUNCA cambiéis de rama**. Tu rama es tu rama, siempre la misma.
4. **NUNCA toquéis `main`**. Esa rama la controlo yo.
5. Trabajamos solo dentro de la carpeta `desktop/`. El resto NI MIRAR.
6. Antes de empezar a tocar código → **PULL**.
7. Después de cada cambio → **COMMIT con mensaje claro**.
8. Al terminar → **PUSH**.
9. Cuando tengáis algo listo, me avisáis. Yo decido qué se lleva a `main`.

---

## 1. Setup inicial (una sola vez por persona)

### 1.1. Aceptar la invitación
Os llegará un email de GitHub o un aviso aquí:
https://github.com/alexxblaro16/proyecto-csic/invitations

Aceptadla. Si no os llega en 5 minutos, decídmelo.

### 1.2. Configurar Git con vuestro nombre y email
Solo si no lo habéis hecho antes:
```bash
git config --global user.name "Vuestro Nombre"
git config --global user.email "vuestro@email.com"
```
Usad el mismo email que tenéis en GitHub.

### 1.3. Clonar mi fork
Donde queráis tener el proyecto en vuestro ordenador:
```bash
git clone https://github.com/alexxblaro16/proyecto-csic.git
cd proyecto-csic
```

### 1.4. Cambiar a VUESTRA rama (la única vez que cambiáis de rama)
```bash
git checkout kevin     # si eres Kevin
git checkout andrea    # si eres Andrea
git checkout gabriel   # si eres Gabriel
```

A partir de aquí, **no volváis a tocar el comando `git checkout` nunca más**. Estáis en vuestra rama y ahí os quedáis para siempre.

---

## 2. Flujo diario — los 3 pasos sagrados

### Paso 1: PULL antes de empezar (siempre)

**Cada vez que vais a sentaros a trabajar:**
```bash
git pull
```

Esto baja los últimos cambios de vuestra rama (por si el ordenador se reinició, por si trabajasteis desde otro sitio, etc.).

### Paso 2: Trabajar y hacer COMMITs con mensajes claros

**Comprobad qué habéis cambiado** antes de hacer commit:
```bash
git status
```

**Añadid los cambios:**
```bash
git add .
```

**Hacer el commit con mensaje EXPLICADO:**
```bash
git commit -m "feat: añadir formulario de login con validación de email"
```

#### REGLA DE ORO del mensaje de commit

> Si yo (o cualquiera del equipo) leo SOLO el mensaje del commit, debo entender qué hiciste **sin abrir el código**.

**Estructura:**
```
tipo: descripción corta y clara
```

**Tipos que vamos a usar:**

| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feat:` | Funcionalidad nueva |
| `fix:` | Arreglo de bug |
| `style:` | Cambios de estilos CSS / Tailwind |
| `refactor:` | Reescribir sin cambiar comportamiento |
| `docs:` | Documentación |
| `chore:` | Tareas técnicas (dependencias, configs) |

**Ejemplos buenos:**
- `feat: añadir botón de logout en el header`
- `fix: corregir error 404 al recargar dashboard`
- `style: ajustar márgenes del menú lateral`
- `refactor: separar componente Button en su propio archivo`
- `docs: añadir comentarios al hook useAuth`

**Ejemplos PROHIBIDOS:**
- `cambios` (cambios de qué)
- `arreglo` (arreglo de qué)
- `wip` (no subir trabajo a medio hacer)
- `asdf` (en serio)
- `update` (no aporta nada)
- `final` (nunca es final)
- `.` (no)

#### Cuándo hacer commit

- Cada vez que terminéis algo coherente (un componente, una función, un fix)
- **NO esperéis al final del día** para hacer un mega-commit con todo. Mejor 5 commits pequeños y claros que 1 enorme.
- Si lleváis 2 horas sin hacer commit, **es señal de que algo va mal**.

### Paso 3: PUSH (subir vuestra rama al fork)

```bash
git push
```

**Hacer push al menos una vez al día**, aunque no hayáis terminado. Si se rompe el ordenador, no se pierde nada.

---

## 3. Donde se trabaja: SOLO `desktop/`

Toda la parte de Front está en la carpeta `desktop/`:

- `desktop/src/` → código React (componentes, vistas, lógica)
- `desktop/src/components/` → componentes reutilizables
- `desktop/electron/` → configuración de Electron (no tocar salvo que sepáis qué hacéis)
- `desktop/public/` → recursos estáticos
- `desktop/package.json` → dependencias del front

**Las demás carpetas (`backend/`, `docker/`, `docs/`) NO se tocan.** Si necesitáis algo de ahí, decídmelo.

Si subís cambios fuera de `desktop/`, los rechazo automáticamente.

---

## 4. Cuando termináis algo importante, avisadme

Cuando hayáis hecho algo que esté para revisar (un componente terminado, un fix funcional, una vista nueva acabada):

1. Aseguraos de que tenéis todo subido:
   ```bash
   git status
   git push
   ```
2. **Avisadme por WhatsApp** con qué habéis hecho.
3. Yo miro vuestra rama, decido qué cojo de ahí y qué no, y lo paso a `main`.
4. Si algo necesita arreglo, os escribo y lo modificáis en vuestra rama.

**No abráis Pull Requests vosotros.** Las gestiono yo.

---

## 5. Reglas NO negociables

| ✅ Sí | ❌ No |
|---|---|
| Trabajar SIEMPRE en vuestra rama propia | Cambiar a `main` o a la rama de otro |
| Solo tocar archivos de `desktop/` | Tocar `backend/`, `docker/`, `docs/` |
| Commits pequeños con mensaje claro | Commits "wip", "asdf", "cambios" |
| `git pull` antes de empezar | Empezar sin actualizar |
| `git push` al menos una vez al día | Dejar el código solo en local una semana |
| Avisarme cuando algo está listo | Abrir PRs vosotros |
| Avisarme si algo falla | `git push --force` o `git reset --hard` |

---

## 6. Errores comunes y cómo arreglarlos

### "He cambiado de rama por error"
Volved a la vuestra:
```bash
git checkout kevin    # o andrea / gabriel
```

### "He hecho cambios pero no quiero commitearlos todavía"
Guardarlos temporalmente:
```bash
git stash
```
Recuperarlos cuando queráis:
```bash
git stash pop
```

### "He hecho commit con un mensaje malísimo"
Si NO habéis hecho push todavía:
```bash
git commit --amend -m "feat: mensaje correcto"
```
Si ya habéis hecho push, dejadlo. No reescribáis lo que ya está subido.

### "Git me dice que tengo conflictos al hacer pull"
**Parad. Avisadme.** No intentéis resolverlo a ciegas. Compartid el mensaje exacto que os sale.

### "He hecho commit en la rama equivocada"
Avisadme. No hagáis nada más. Lo arreglamos.

### "Quiero ver en qué rama estoy"
```bash
git branch
```
La rama actual sale con un asterisco (*). Tiene que ser la vuestra.

### "Quiero ver el historial de commits"
```bash
git log --oneline
```

---

## 7. Chuleta final (imprimir y pegar en la mesa)

```bash
# UNA SOLA VEZ (al clonar el repo)
git clone https://github.com/alexxblaro16/proyecto-csic.git
cd proyecto-csic
git checkout TU_NOMBRE     # kevin, andrea o gabriel

# AL EMPEZAR EL DÍA
git pull

# DURANTE EL DÍA, CADA VEZ QUE TERMINÁIS ALGO COHERENTE
git status                                            # ver qué habéis cambiado
git add .                                             # añadir cambios
git commit -m "feat: descripción clara de qué hice"   # commit con mensaje BUENO
git push                                              # subir al fork

# CUANDO ALGO ESTÁ LISTO PARA QUE LO REVISE
# 1. git push (que esté todo subido)
# 2. Avisarme por WhatsApp
```

---

## 8. Cualquier duda

Antes de tocar algo que no sabéis, **preguntadme**. Tardo 2 minutos en responder y os ahorro media hora de marrón.

Lo único que NO se puede romper es el repo original. Todo lo demás se arregla.

Vamos a por ello.

— Alejandro
