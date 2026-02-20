# Dr. Recetas — Documentación Técnica

> Plataforma de servicios médicos digitales para Puerto Rico: consultas en línea, recetas digitales, certificados médicos y atención 24/7.

---

## Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Variables de Entorno](#4-variables-de-entorno)
5. [Instalación y Desarrollo](#5-instalación-y-desarrollo)
6. [Internacionalización (i18n)](#6-internacionalización-i18n)
7. [Autenticación](#7-autenticación)
8. [Carrito y Checkout](#8-carrito-y-checkout)
9. [Pagos](#9-pagos)
10. [API Endpoints](#10-api-endpoints)
11. [Componentes Clave](#11-componentes-clave)
12. [Contextos (State Management)](#12-contextos-state-management)
13. [Rutas de la Aplicación](#13-rutas-de-la-aplicación)
14. [SEO y Metadatos](#14-seo-y-metadatos)
15. [Docker](#15-docker)

---

## 1. Descripción General

**Dr. Recetas** es una aplicación web construida con Next.js 16 (App Router) que permite a los usuarios de Puerto Rico acceder a servicios médicos digitales:

- 🩺 Recetas médicas digitales
- 📋 Certificados médicos (incapacidad, escolar, laboral, etc.)
- 💊 Consultas médicas en línea
- 👤 Perfil de paciente con historial de órdenes
- 💳 Pago con tarjeta de crédito y ATH Móvil

El sitio es **bilingüe** (español / inglés), completamente **responsive** y está optimizado para SEO.

---

## 2. Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes UI | Radix UI + shadcn/ui |
| Animaciones | Motion (Framer Motion) / GSAP |
| i18n | next-intl v4 |
| Iconos | react-icons / lucide-react |
| Notificaciones | Sonner |
| Formularios | Validación manual + Zod |
| HTTP | fetch nativo / axios |
| Carrusel | Embla Carousel |
| Deploy | Docker (standalone) / Vercel |

---

## 3. Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/                  # Rutas con soporte i18n
│   │   ├── layout.tsx             # Layout principal (Header, Footer, Providers)
│   │   ├── page.tsx               # Página de inicio
│   │   ├── (otros)/               # Rutas sin layout especial
│   │   │   ├── carrito/           # Checkout de 3 pasos
│   │   │   ├── login/             # Inicio de sesión
│   │   │   ├── perfil/            # Perfil del usuario
│   │   │   ├── politicas-privacidad/
│   │   │   ├── procesar-pago/     # Redirección post-pago
│   │   │   ├── restablecer-contrasena/
│   │   │   └── terminos-condiciones/
│   │   ├── lock/                  # Página de mantenimiento
│   │   ├── membresias/            # Planes de membresía
│   │   └── servicios/[slug]/      # Detalle de cada servicio
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── header.tsx                 # Navegación principal
│   ├── footer.tsx
│   ├── page-wrapper.tsx           # Wrapper con animación de entrada
│   ├── structured-data.tsx        # JSON-LD para SEO
│   ├── cart/                      # Componentes del checkout
│   │   ├── stepper.tsx            # Indicador de pasos (1-3)
│   │   ├── personal-info-form.tsx # Paso 1: datos personales
│   │   ├── order-details.tsx      # Paso 2: detalles de la orden
│   │   ├── payment-form.tsx       # Paso 3: pago
│   │   ├── cart-review.tsx        # Vista del carrito lateral
│   │   ├── empty-cart.tsx
│   │   └── types.ts               # CartFormData interface
│   ├── home/                      # Secciones de la landing
│   │   ├── hero-section.tsx
│   │   ├── services-section.tsx
│   │   ├── services-carousel.tsx
│   │   ├── how-it-works.tsx
│   │   ├── why-choose-us.tsx
│   │   ├── benefits-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── faq-section.tsx
│   │   └── chatbot-section.tsx
│   ├── shell/
│   │   ├── chatbot-floating.tsx   # Botón flotante del chatbot
│   │   └── chatbot-panel.tsx      # Panel de conversación
│   ├── profile/
│   │   ├── profile-info-form.tsx
│   │   ├── profile-orders-list.tsx
│   │   ├── profile-transaction-list.tsx
│   │   └── pdf-viewer.tsx
│   ├── servicios/
│   │   ├── product-detail-client.tsx
│   │   └── other-services-carousel.tsx
│   └── ui/                        # Componentes base (shadcn/ui)
│
├── context/
│   ├── auth-context.tsx           # Sesión del usuario
│   ├── cart-context.tsx           # Estado del carrito
│   └── chat-context.tsx           # Estado del chatbot
│
├── hooks/
│   ├── use-product-detail.ts
│   ├── use-service-details.ts
│   └── use-is-mounted.ts
│
├── i18n/
│   ├── routing.ts                 # Locales: ['es', 'en'], default: 'es'
│   └── request.ts
│
├── lib/
│   ├── api.ts                     # Funciones de fetch al backend
│   ├── services-data.ts           # Datos estáticos de servicios
│   └── utils.ts                   # cn() y helpers
│
└── services/types/
    └── types.ts                   # Tipos globales (UserData, etc.)

messages/
├── es.json                        # Traducciones en español
└── en.json                        # Traducciones en inglés
```

---

## 4. Variables de Entorno

No se requieren variables de entorno críticas en tiempo de build (el token de ATH Móvil está embebido en el cliente). Para configuración avanzada se pueden agregar:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_BASE` | URL base del backend (por defecto `https://doctorrecetas.com/api`) |

---

## 5. Instalación y Desarrollo

### Requisitos

- Node.js >= 20
- npm / pnpm / yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd dr-recetas

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
# → http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo (Next.js)
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # Linter (ESLint)
```

---

## 6. Internacionalización (i18n)

Se usa **next-intl v4** con enrutamiento basado en prefijo de locale.

| Locale | URL | Estado |
|---|---|---|
| Español (default) | `/es/...` | ✅ Completo |
| Inglés | `/en/...` | ✅ Completo |

### Archivos de traducción

```
messages/
├── es.json   # Español
└── en.json   # Inglés
```

### Namespaces principales

| Namespace | Uso |
|---|---|
| `Cart.Payment` | Formulario de pago y errores |
| `ServicesPage` | Títulos y descripciones de servicios |
| `DynamicServices` | Servicios obtenidos desde la API |
| `Chatbot` | Textos del chatbot flotante |
| `Header` / `Footer` | Navegación |

### Uso en componentes cliente

```typescript
const t = useTranslations("Cart.Payment");
t("title");              // string
t.has("some.key");       // boolean — verifica si existe
```

### Uso en componentes servidor

```typescript
const t = await getTranslations({ locale, namespace: "ServicesPage" });
```

---

## 7. Autenticación

### Flujo

1. El usuario inicia sesión desde `HeaderLoginSheet` o `/login`
2. El token JWT y los datos del usuario se almacenan en `localStorage`:
   - `dr_token` → string del token
   - `dr_user` → JSON con `{ ...UserData, token }`
3. El `AuthContext` hidrata el estado inicial desde `localStorage` al montar
4. El logout llama a `POST /api/logout.php` e invalida la sesión en el servidor

### AuthContext API

```typescript
const { user, token, isLoading, login, logout } = useAuth();
```

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `user` | `UserData \| null` | Datos del usuario autenticado |
| `token` | `string \| null` | JWT actual |
| `isLoading` | `boolean` | Estado de carga inicial |
| `login(userData, token)` | `void` | Guarda sesión en memoria y localStorage |
| `logout()` | `async void` | Invalida token en servidor y limpia estado |

### Expiración de sesión

El contexto monitorea el `localStorage` en tiempo real (`storage` event). Si el token es removido externamente (otra pestaña), muestra un modal de sesión expirada automáticamente.

---

## 8. Carrito y Checkout

### CartContext API

```typescript
const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
```

- El carrito se persiste en `localStorage` con la clave `dr-recetas-cart`
- Si el usuario intenta añadir un servicio duplicado, se muestra un `Dialog` de aviso en lugar de agregar dos veces

### CartItem

```typescript
interface CartItem {
  id: string;
  titulo: string;
  precio: string;       // string numérico, ej: "29.99"
  imagen: string;
  categoria: string;
  detalle?: string;
  resumen?: string;
  slug?: string;
}
```

### Flujo de Checkout (3 pasos)

```
Paso 1 — PersonalInfoForm
  ↓  nombre, fecha nacimiento, país, dirección, teléfono, email, documento
  
Paso 2 — OrderDetails
  ↓  nombre del paciente por cada servicio en el carrito
  
Paso 3 — PaymentForm
  ↓  selección de método de pago → procesar → /procesar-pago
```

### CartFormData

```typescript
interface CartFormData {
  nombre_completo: string;
  fecha_nacimiento: string;
  pais: string;
  municipio: string;
  direccion: string;
  apartamento: string;
  codigo_postal: string;
  telefono: string;
  tipo_documento: string;
  numero_documento: string;
  email: string;
  identificacion_archivo: File | null;
  order_names: Record<string, string>;  // itemId → nombre del paciente
  payment_method: "ath" | "tarjeta";
}
```

---

## 9. Pagos

### Métodos soportados

| Método | Endpoint | Descripción |
|---|---|---|
| Tarjeta de crédito | `POST /api/pagar.php` | Procesado directamente |
| ATH Móvil | `POST /api/pago_ath.php` | Digital Wallet nativo de PR |

---

### ATH Móvil

Se renderiza mediante un `<iframe>` con `srcDoc` integrado. La comunicación con el padre se hace via `postMessage`.

#### Token de producción

```
54227b700bb036f91a3a7bca06479230f0d92524
```

#### Mensajes del iframe

| Tipo | Acción |
|---|---|
| `ATH_SUCCESS` | Llama a `handleATHSuccess` con los datos de la transacción |
| `ATH_CANCEL` | Muestra toast de error |
| `ATH_EXPIRED` | Muestra toast de expiración |
| `ATH_MODAL_OPEN` | Expande el iframe a pantalla completa |
| `ATH_MODAL_CLOSE` | Colapsa el iframe |

#### Payload a `POST /api/pago_ath.php`

```json
{
  "data": { "status": "completed", "transaction_id": "ATH123456789" },
  "pq_id": [1, 2],
  "anombre_de": ["Juan Perez"],
  "pq_precio": 29.99,
  "iny_fecha": "2026-02-19 10:00",
  "iny_direccion": "Calle Principal 123, Apt 1",
  "pi_id": [1, 2],
  "pp_id": 1
}
```

#### Respuesta exitosa

```json
{
  "success": true,
  "data": {
    "mensaje": "Pago ATH procesado exitosamente",
    "us_id": 123,
    "cp_code": "CP20260218001",
    "transaction_id": "ATH123456789",
    "status": "completed",
    "monto": 29.99,
    "metodo": "ATH Móvil",
    "orden_enviada": true
  }
}
```

> Soporta `status: "completed"` y `status: "pending"`

---

### Tarjeta de Crédito

#### Payload a `POST /api/pagar.php`

```json
{
  "pq_id": [1, 2],
  "anombre_de": ["Juan Perez"],
  "pq_precio": 29.99,
  "card_number": "4111111111111111",
  "card_exp_month": "12",
  "card_exp_year": "2027",
  "card_cvc": "123",
  "card_name": "JUAN PEREZ"
}
```

---

### Post-Pago

Tras un pago exitoso (cualquier método), se guarda en `sessionStorage`:

```json
{
  "cp_code": "CP20260218001",
  "token": "<jwt>",
  "transaction_id": "ATH123456789",
  "status": "completed",
  "metodo": "ATH Móvil"
}
```

Y se redirige a `/procesar-pago`, que consume estos datos para confirmar la orden.

---

## 10. API Endpoints

Base URL: `https://doctorrecetas.com/api`

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/categorias_principales.php` | ❌ | Lista de categorías de servicios |
| `GET` | `/todas_las_ordenes.php` | ❌ | Todos los servicios agrupados por categoría |
| `POST` | `/pagar.php` | ✅ Bearer | Procesar pago con tarjeta |
| `POST` | `/pago_ath.php` | ✅ Bearer | Procesar pago con ATH Móvil |
| `POST` | `/logout.php` | ✅ Bearer | Invalidar sesión en servidor |

> **Auth**: Header `Authorization: Bearer <token>`

---

## 11. Componentes Clave

### `PaymentForm`

Maneja el paso 3 del checkout. Renderiza:
- Resumen de la orden
- Selector de método de pago (ATH / Tarjeta)
- Iframe de ATH Móvil (expandible a fullscreen)
- Modal de formulario de tarjeta
- Modal de error con mensajes amigables

**Props:**

```typescript
interface PaymentFormProps {
  cart: CartItem[];
  formData: CartFormData;
  setFormData: (data: CartFormData) => void;
  purchaseId: string;
  total: number;
  onBack: () => void;
  onComplete?: () => void;
}
```

---

### `ChatbotFloating`

Botón flotante (esquina inferior derecha) que abre el `ChatbotPanel`.

- Se **oculta automáticamente** cuando los elementos `#hero`, `#home`, `#chatbot` o `#footer` están en el viewport (IntersectionObserver)
- Se oculta en rutas `/lock` y `/`
- El observer se re-inicializa en cada cambio de ruta (`pathname` como dep del `useEffect`)
- Sube `70px` cuando la bottom bar del chat está visible

---

### `StructuredData`

Inyecta JSON-LD (`application/ld+json`) en el `<head>` para SEO:
- `Organization`
- `MedicalOrganization`
- `WebSite` con `SearchAction`

---

## 12. Contextos (State Management)

| Contexto | Provider | Descripción |
|---|---|---|
| `AuthContext` | `AuthProvider` | Sesión del usuario, JWT, login/logout |
| `CartContext` | `CartProvider` | Items del carrito, total, persistencia en localStorage |
| `ChatContext` | `ChatProvider` | Estado del chatbot (mensajes, visibilidad) |

Todos los providers están envueltos en el `layout.tsx` raíz.

---

## 13. Rutas de la Aplicación

| Ruta | Descripción | Auth requerida |
|---|---|---|
| `/` o `/es` | Landing page | ❌ |
| `/es/servicios/[slug]` | Detalle de un servicio | ❌ |
| `/es/membresias` | Planes VIP | ❌ |
| `/es/carrito` | Checkout 3 pasos | ✅ |
| `/es/perfil` | Perfil y órdenes del usuario | ✅ |
| `/es/login` | Inicio de sesión / registro | ❌ |
| `/es/restablecer-contrasena` | Recuperación de contraseña | ❌ |
| `/es/procesar-pago` | Confirmación de orden post-pago | ✅ (sessionStorage) |
| `/es/terminos-condiciones` | Términos legales | ❌ |
| `/es/politicas-privacidad` | Política de privacidad | ❌ |
| `/lock` | Página de mantenimiento | ❌ |

> Todas las rutas anteriores también están disponibles con prefijo `/en/` en inglés.

---

## 14. SEO y Metadatos

- **Sitemap dinámico** generado en `src/app/[locale]/sitemap.ts`
- **robots.ts** con reglas de crawling
- **Open Graph** y **Twitter Cards** configurados en `layout.tsx`
- **Google Search Console** verificado (`googlef639e9c60eac2963.html`)
- **Structured Data** (JSON-LD) en cada página

---

## 15. Docker

El proyecto incluye `Dockerfile` y `docker-compose.yml` para deploy en producción.

```bash
# Build y levantar contenedor
docker compose up --build -d

# Solo build
docker build -t dr-recetas .
```

La configuración de Next.js usa `output: "standalone"` para generar un bundle optimizado para contenedores.

---

*Última actualización: Febrero 2026*
