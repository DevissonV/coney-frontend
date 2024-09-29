# Coney Frontend

Este es el repositorio frontend de **Coney**, una aplicación diseñada para facilitar la gestión de rifas, enfocada en usuarios comunes.

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:
```
┣ 📂public
┃ ┣ 📂locales
┃ ┃ ┣ 📂en
┃ ┃ ┃ ┗ 📜translation.json
┃ ┃ ┗ 📂es
┃ ┃   ┗ 📜translation.json
┃ ┣ 📂static
┃ ┃ ┣ 📜countries.json
┃ ┃ ┗ 📜login.json
┃ ┗ 📜vite.svg
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📜react.svg
┃ ┣ 📂components
┃ ┃ ┣ 📂countries-components
┃ ┃ ┃ ┣ 📜CountriesTable.jsx
┃ ┃ ┃ ┣ 📜CountryActions.jsx
┃ ┃ ┃ ┗ 📜CountryFormModal.jsx
┃ ┃ ┣ 📂dashboard-components
┃ ┃ ┃ ┣ 📂layout
┃ ┃ ┃ ┃ ┗ 📜Layout.jsx
┃ ┃ ┃ ┣ 📜DashboardWidget.jsx
┃ ┃ ┃ ┗ 📜WelcomeMessage.jsx
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┣ 📂button
┃ ┃ ┃ ┃ ┗ 📜Button.jsx
┃ ┃ ┃ ┣ 📂input
┃ ┃ ┃ ┃ ┗ 📜Input.jsx
┃ ┃ ┃ ┣ 📂navbar
┃ ┃ ┃ ┃ ┗ 📜ResponsiveAppBar.jsx
┃ ┃ ┃ ┗ 📂search-toolbar
┃ ┃ ┃   ┗ 📜SearchToolbar.jsx
┃ ┃ ┣ 📂riffle-components
┃ ┃ ┃ ┣ 📜RiffeTable.jsx
┃ ┃ ┃ ┣ 📜RiffleActions.jsx
┃ ┃ ┃ ┗ 📜RiffleFormModal.jsx
┃ ┃ ┗ 📂users-components
┃ ┃   ┣ 📜UserActions.jsx
┃ ┃   ┣ 📜UserCreateModal.jsx
┃ ┃   ┣ 📜UserEditModal.jsx
┃ ┃   ┗ 📜UsersTable.jsx
┃ ┣ 📂containers
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜AuthContainer.jsx
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountriesContainer.jsx
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardContainer.jsx
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RiffleContainer.jsx
┃ ┃ ┗ 📂users
┃ ┃   ┗ 📜UsersContainer.jsx
┃ ┣ 📂hooks
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜useAuth.js
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜useCountries.js
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┗ 📜useSearch.js
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜useRiffle.js
┃ ┃ ┗ 📂users
┃ ┃   ┗ 📜useUsers.jsx
┃ ┣ 📂pages
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜LoginPage.jsx
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountriesPage.jsx
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardPage.jsx
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RifflePage.jsx
┃ ┃ ┣ 📂users
┃ ┃ ┃ ┗ 📜UsersPage.jsx
┃ ┃ ┗ 📜NotFoundPage.jsx
┃ ┣ 📂router
┃ ┃ ┗ 📜router.jsx
┃ ┣ 📂services
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜AuthService.js
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountryService.js
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardService.js
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┗ 📜AlertService.js
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RiffleService.js
┃ ┃ ┗ 📂users
┃ ┃   ┗ 📜UserService.js
┃ ┣ 📂stores
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜useAuthStore.js
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜useDashboardStore.js
┃ ┃ ┗ 📂users
┃ ┃   ┗ 📜useUserStore.js
┃ ┣ 📂utils
┃ ┃ ┣ 📂api
┃ ┃ ┃ ┗ 📜axios.js
┃ ┃ ┗ 📂generic
┃ ┃   ┣ 📜convertText.js
┃ ┃   ┣ 📜i18n.js
┃ ┃   ┣ 📜securityValidations.js
┃ ┃   ┗ 📜transformDates.js
┃ ┣ 📂wrappers
┃ ┃ ┣ 📜AuthWrapper.jsx
┃ ┃ ┗ 📜ThemeWrapper.jsx
┃ ┣ 📜App.css
┃ ┣ 📜App.jsx
┃ ┣ 📜index.css
┃ ┗ 📜main.jsx
┣ 📜.env
┣ 📜.env.local
┣ 📜.env.local.example
┣ 📜.eslintrc.js
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜jsconfig.json
┣ 📜package.json
┣ 📜README.md
┗ 📜vite.config.js

```
### Descripción de carpetas:

- **.📂public/**: 
  - **locales**: Aquí tienes las traducciones para i18n (internacionalización), lo que permite que la aplicación soporte múltiples idiomas.
    - en/translation.json: Traducciones al inglés.
    - es/translation.json: Traducciones al español.
  - **static/login.json:**:  Archivo estático donde hay información para simular el login


- **.📂src/**: 
  - **assets**: Recursos estáticos como imágenes o íconos.
  - **components**: Componentes reutilizables y modulares de la UI (interfaz de usuario).
  - **containers**: Estos son los "contenedores" de lógica que orquestan el estado y las interacciones de los componentes.
  - **hooks**: Aquí están los custom hooks, reutilizables en la aplicación.
  - **pages**: Aquí están las páginas principales de la aplicación.
  - **router**: Aquí están las rutas de la aplicación.
  - **services**:  Servicios que manejan la lógica de negocio y llamadas a APIs.
  - **stores**: Aquí están las configuraciones de Zustand, la librería que usas para el manejo de estados globales.
  - **utils**: Utilidades y funciones auxiliares.
  - **wrappers**: Aquí están los componentes que envuelven a otros componentes para proporcionar funcionalidades adicionales.


## Instalación

Para configurar y ejecutar el proyecto en tu entorno local, sigue los siguientes pasos:

### Prerrequisitos

- **Node.js**: Asegúrate de tener instalado [Node.js](https://nodejs.org/) en su versión LTS.
- **npm** o **yarn**: Un manejador de paquetes, generalmente `npm` viene con Node.js.

### Clonar el Repositorio

Clona este repositorio en tu máquina local:

```
git clone https://github.com/DevissonV/Coney.Frontend.git
cd Coney.Frontend
```

### Instalar dependencias 
```
npm install
```

### Configurar variables de entornos

Crear el archivo ```.env```  en base al: ```.env.local.example``` ubicado en la raiz del proyecto



### Ejecutar en modo desarrollo
```
npm run dev
```

### Ejecutar en modo produccion
```
npm run build
```