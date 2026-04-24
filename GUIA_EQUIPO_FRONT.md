# Guía del equipo Front End — Proyecto CSIC

> **Lead:** Alejandro
> **Equipo:** Kevin, Andrea, Gabriel
> **Repo de trabajo:** https://github.com/alexxblaro16/proyecto-csic (fork de Alejandro)
> **Repo original (NO TOCAR):** https://github.com/PRNovoa/proyecto-csic

---

## Resumen en 30 segundos

1. Trabajamos sobre **MI FORK** (`alexxblaro16/proyecto-csic`), no sobre el original.
2. Cada uno en **su rama** (`feature/frontend-...`), nunca en `main`.
3. Antes de empezar a tocar código → **PULL**.
4. Después de cada cambio → **COMMIT con mensaje claro**.
5. Al terminar el día o la tarea → **PUSH**.
6. Cuando esté listo para revisar → **PR contra mi fork** (no contra el original).
7. Yo reviso, mergeo en mi fork, y cuando el bloque está terminado, yo subo al original.

---

## 1. Setup inicial (una sola vez por persona)

### 1.1. Aceptar la invitación
Os llegará un email de GitHub o un aviso aquí:
https://github.com/alexxblaro16/proyecto-csic/invitations

Aceptadla. Si no os llega en 5 minutos, decídmelo.

### 1.2. Configurar Git con vuestro nombre y email
Solo si no lo habéis hecho ya:
```bash
git config --global user.name "Vuestro Nombre"
git config --global user.email "vuestro@email.com"
```
Usad el mismo email que tenéis en GitHub.

### 1.3. Clonar mi fork
Donde queráis tener el proyecto:
```bash
git clone https://github.com/alexxblaro16/proyecto-csic.git
cd proyecto-csic
```

### 1.4. Añadir el repo original como referencia (recomendado)
Esto os deja traer cambios cuando otros equipos suban cosas, sin riesgo de subir al original:
```bash
git remote add upstream https://github.com/PRNovoa/proyecto-csic.git
git remote set-url --push upstream NO_PUSH
```

Comprobad que queda así:
```bash
git remote -v
```
Tenéis que ver:
- `origin` → mi fork (fetch y push)
- `upstream` → repo original (fetch sí, push BLOQUEADO)

---

## 2. Flujo diario — los 4 pasos sagrados

### Paso 1: PULL antes de empezar (siempre)
**Cada vez que vais a sentaros a trabajar:**
```bash
git checkout main
git pull origin main
```
Esto baja los últimos cambios del fork. Si os saltáis esto, vais a tener conflictos al subir.

### Paso 2: Crear o cambiar a vuestra rama
Si la tarea es nueva, creáis rama:
```bash
git checkout -b feature/frontend-login-kevin
```

Si la rama ya existe (ya estabais trabajando en ella):
```bash
git checkout feature/frontend-login-kevin
git pull origin feature/frontend-login-kevin
```

**Convención de nombres** (obligatoria):
- `feature/frontend-loquesea-tunombre` → nueva funcionalidad
- `fix/frontend-loquesea-tunombre` → arreglo de bug
- `docs/frontend-loquesea-tunombre` → solo documentación

Ejemplos buenos:
- `feature/frontend-formulario-login-kevin`
- `feature/frontend-vista-mapa-andrea`
- `fix/frontend-boton-roto-gabriel`

Ejemplos malos:
- `mi-rama` (no se sabe qué es ni de quién)
- `cambios` (cambios de qué)
- `kevin` (no se sabe qué hace)

### Paso 3: COMMIT con mensaje claro (cada vez que termináis algo coherente)

**Comprobad qué habéis cambiado** antes de hacer commit:
```bash
git status
git diff
```

**Añadid los archivos:**
```bash
git add .
```
(Si solo queréis subir uno: `git add ruta/del/archivo.jsx`)

**Hacer el commit con mensaje EXPLICADO:**
```bash
git commit -m "feat: añadir formulario de login con validación de email"
```

#### REGLA DE ORO: el mensaje de commit

> Si yo (o cualquiera del equipo) leo solo el mensaje, debo entender qué hiciste **sin abrir el código**.

**Estructura del mensaje:**
```
tipo: descripción corta en presente
```

**Tipos que vamos a usar:**
| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feat:` | Funcionalidad nueva |
| `fix:` | Arreglo de bug |
| `style:` | Cambios de estilos CSS / Tailwind |
| `refactor:` | Reescribir sin cambiar comportamiento |
| `docs:` | Documentación |
| `chore:` | Tareas técnicas (deps, configs) |

**Ejemplos buenos:**
- `feat: añadir botón de logout en el header`
- `fix: corregir error 404 al recargar dashboard`
- `style: ajustar márgenes del menú lateral`
- `refactor: separar componente Button en su propio archivo`
- `docs: añadir comentarios al hook useAuth`

**Ejemplos PROHIBIDOS:**
- `cambios` (qué cambios)
- `arreglo` (arreglo de qué)
- `wip` (trabajo en progreso, no subir esto)
- `asdf` (en serio)
- `update` (no aporta nada)
- `final` (nunca es final)

#### Cuándo hacer commit
- Cuando termináis una pieza coherente (un componente, una función, un fix)
- **NO esperéis al final del día** para hacer un mega-commit con todo. Mejor 5 commits pequeños y claros que 1 enorme.
- Si lleváis 2 horas sin hacer commit, **es señal de que algo va mal**.

### Paso 4: PUSH (subir vuestra rama a mi fork)

La primera vez que subís una rama nueva:
```bash
git push -u origin feature/frontend-login-kevin
```
El `-u` es para que git recuerde a qué rama remota apunta. Solo se pone la primera vez.

Las siguientes veces, en la misma rama, basta con:
```bash
git push
```

**Hacer push al menos una vez al día**, aunque no hayáis terminado. Así si se os rompe el ordenador, no perdéis nada.

---

## 3. Cuando termináis la tarea: abrir Pull Request

1. Aseguraos de que tenéis todo subido:
   ```bash
   git status
   git push
   ```
2. Id a https://github.com/alexxblaro16/proyecto-csic/pulls
3. Click en **"New pull request"**
4. **CUIDADO con la base** — GitHub a veces propone hacer PR contra el original. Tiene que quedar así:
   - **base repository:** `alexxblaro16/proyecto-csic`
   - **base:** `main`
   - **compare:** vuestra rama `feature/frontend-...`
5. Título de la PR: claro y descriptivo (mismo estilo que los commits)
6. Descripción: qué habéis hecho, qué falta, qué hay que probar
7. Asignadme a mí como **reviewer**
8. Click **"Create pull request"**

Yo reviso, comento si hace falta, y mergeo cuando esté bien.

---

## 4. Reglas NO negociables

| ✅ Sí | ❌ No |
|---|---|
| Trabajar en mi fork | Tocar el repo de PRNovoa |
| Una rama por tarea | Trabajar directo en `main` |
| Commits pequeños y claros | Commits "wip" o "asdf" |
| `git pull` antes de empezar | Empezar sin actualizar |
| `git push` al terminar el día | Dejar el código solo en local una semana |
| PR contra MI fork | PR contra el original (eso lo hago yo) |
| Avisarme si algo falla | `git push --force` o `git reset --hard` |

---

## 5. Errores comunes y cómo arreglarlos

### "He hecho cambios pero no quiero commitearlos todavía"
Guardarlos temporalmente:
```bash
git stash
```
Recuperarlos después:
```bash
git stash pop
```

### "He hecho commit en main por error"
**No hagáis nada más, avisadme.** Lo arreglamos juntos. Si pusheas, peor.

### "Git me dice que tengo conflictos al hacer pull"
**Parad. Avisadme.** No intentéis resolver el conflicto a ciegas si no sabéis. Compartid el mensaje exacto que os sale.

### "He hecho commit con un mensaje malísimo"
Si NO habéis hecho push todavía:
```bash
git commit --amend -m "feat: mensaje correcto esta vez"
```
Si ya habéis hecho push, dejadlo. No reescribáis historia compartida.

### "Quiero ver qué ramas hay"
```bash
git branch -a
```

### "Quiero ver el historial"
```bash
git log --oneline --graph --all
```

---

## 6. Chuleta final (imprimir y pegar en la mesa)

```bash
# AL EMPEZAR EL DÍA
git checkout main
git pull origin main
git checkout -b feature/frontend-loquesea-tunombre   # solo si es rama nueva
git checkout feature/frontend-loquesea-tunombre      # si ya existe
git pull origin feature/frontend-loquesea-tunombre   # si ya existe

# DURANTE EL DÍA, CADA VEZ QUE TERMINÁIS ALGO COHERENTE
git status                                            # ver qué hay
git add .                                             # añadir cambios
git commit -m "feat: descripción clara de qué hice"   # commit con mensaje BUENO
git push                                              # subir (la primera vez: git push -u origin nombre-rama)

# AL TERMINAR LA TAREA
# 1. git push (asegurarse de que está todo subido)
# 2. Abrir PR en GitHub contra alexxblaro16/proyecto-csic
# 3. Asignarme como reviewer
```

---

## 7. Cualquier duda

Antes de tocar algo que no sabéis, **preguntadme**. Tardo 2 minutos en responder y os ahorro media hora de marrón.

Lo único que NO se puede romper es el repo original. Todo lo demás se arregla.

Vamos a por ello.

— Alejandro
