# Coney Frontend

Este es el repositorio frontend de **Coney**, una aplicación diseñada para facilitar la gestión de rifas, enfocada en usuarios comunes.

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:
```
┣ 📂dist
┃ ┣ 📂assets
┃ ┃ ┣ 📜index-Im40ftOU.css
┃ ┃ ┣ 📜index-XHl46WJ8.js
┃ ┃ ┗ 📜trofeo-Cxbks36X.ico
┃ ┣ 📂locales
┃ ┃ ┣ 📂en
┃ ┃ ┃ ┗ 📜translation.json
┃ ┃ ┗ 📂es
┃ ┃   ┗ 📜translation.json
┃ ┣ 📜_redirects
┃ ┣ 📜index.html
┃ ┗ 📜vite.svg
┣ 📂public
┃ ┣ 📂locales
┃ ┃ ┣ 📂en
┃ ┃ ┃ ┗ 📜translation.json
┃ ┃ ┗ 📂es
┃ ┃   ┗ 📜translation.json
┃ ┣ 📜_redirects
┃ ┗ 📜vite.svg
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┣ 📜react.svg
┃ ┃ ┗ 📜trofeo.ico
┃ ┣ 📂components
┃ ┃ ┣ 📂authorization-components
┃ ┃ ┃ ┣ 📜AuthorizationDocumentsList.jsx
┃ ┃ ┃ ┣ 📜AuthorizationDocumentUploader.jsx
┃ ┃ ┃ ┗ 📜AuthorizationReviewModal.jsx
┃ ┃ ┣ 📂countries-components
┃ ┃ ┃ ┣ 📜CountriesTable.jsx
┃ ┃ ┃ ┣ 📜CountryActions.jsx
┃ ┃ ┃ ┗ 📜CountryFormModal.jsx
┃ ┃ ┣ 📂dashboard-components
┃ ┃ ┃ ┗ 📂layout
┃ ┃ ┃   ┗ 📜Layout.jsx
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┣ 📂button
┃ ┃ ┃ ┃ ┗ 📜Button.jsx
┃ ┃ ┃ ┣ 📂cards
┃ ┃ ┃ ┃ ┗ 📜GenericCard.jsx
┃ ┃ ┃ ┣ 📂input
┃ ┃ ┃ ┃ ┗ 📜Input.jsx
┃ ┃ ┃ ┣ 📂navbar
┃ ┃ ┃ ┃ ┣ 📜LanguageToggleButton.jsx
┃ ┃ ┃ ┃ ┣ 📜NavLinks.jsx
┃ ┃ ┃ ┃ ┣ 📜ResponsiveAppBar.jsx
┃ ┃ ┃ ┃ ┣ 📜ResponsiveDrawer.jsx
┃ ┃ ┃ ┃ ┣ 📜ThemeToggleButton.jsx
┃ ┃ ┃ ┃ ┗ 📜UserMenu.jsx
┃ ┃ ┃ ┣ 📂search-toolbar
┃ ┃ ┃ ┃ ┗ 📜SearchToolbar.jsx
┃ ┃ ┃ ┗ 📂table
┃ ┃ ┃   ┗ 📜CellContent.jsx
┃ ┃ ┣ 📂payments-components
┃ ┃ ┃ ┗ 📜PaymentCardList.jsx
┃ ┃ ┣ 📂riffle-components
┃ ┃ ┃ ┣ 📜RiffleActions.jsx
┃ ┃ ┃ ┣ 📜RiffleCardList.jsx
┃ ┃ ┃ ┗ 📜RiffleFormModal.jsx
┃ ┃ ┣ 📂tickets-components
┃ ┃ ┃ ┗ 📜TicketFormModal.jsx
┃ ┃ ┣ 📂users-components
┃ ┃ ┃ ┣ 📜UserCard.jsx
┃ ┃ ┃ ┣ 📜UserChangePasswordModal.jsx
┃ ┃ ┃ ┣ 📜UserCreateModal.jsx
┃ ┃ ┃ ┣ 📜UserEditModal.jsx
┃ ┃ ┃ ┗ 📜UserPasswordRecoveryModal.jsx
┃ ┃ ┗ 📂winners-components
┃ ┃   ┗ 📜WinnersCardList.jsx
┃ ┣ 📂containers
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜AuthContainer.jsx
┃ ┃ ┣ 📂authorization
┃ ┃ ┃ ┗ 📜AuthorizationContainer.jsx
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountriesContainer.jsx
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardContainer.jsx
┃ ┃ ┣ 📂payments
┃ ┃ ┃ ┗ 📜PaymentsContainer.jsx
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RiffleContainer.jsx
┃ ┃ ┣ 📂tickets
┃ ┃ ┃ ┗ 📜TicketsContainer.jsx
┃ ┃ ┣ 📂users
┃ ┃ ┃ ┗ 📜UsersContainer.jsx
┃ ┃ ┗ 📂winners
┃ ┃   ┗ 📜WinnersContainer.jsx
┃ ┣ 📂hooks
┃ ┃ ┣ 📂authorization
┃ ┃ ┃ ┗ 📜useAuthorization.js
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜useCountries.js
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┗ 📜useSearch.js
┃ ┃ ┣ 📂payments
┃ ┃ ┃ ┗ 📜usePayments.js
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜useRiffle.js
┃ ┃ ┣ 📂tickets
┃ ┃ ┃ ┗ 📜useTickets.js
┃ ┃ ┣ 📂users
┃ ┃ ┃ ┗ 📜useUsers.jsx
┃ ┃ ┗ 📂winners
┃ ┃   ┗ 📜useWinners.js
┃ ┣ 📂pages
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜LoginPage.jsx
┃ ┃ ┣ 📂authorization
┃ ┃ ┃ ┗ 📜AuthorizationPage.jsx
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountriesPage.jsx
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardPage.jsx
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┣ 📜NotFoundPage.jsx
┃ ┃ ┃ ┗ 📜ThankYouPage.jsx
┃ ┃ ┣ 📂payments
┃ ┃ ┃ ┣ 📜PaymentCancelPage.jsx
┃ ┃ ┃ ┣ 📜PaymentsPage.jsx
┃ ┃ ┃ ┗ 📜PaymentSuccessPage.jsx
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RifflePage.jsx
┃ ┃ ┣ 📂tickets
┃ ┃ ┃ ┗ 📜TicketsPage.jsx
┃ ┃ ┣ 📂users
┃ ┃ ┃ ┣ 📜PasswordChangePage.jsx
┃ ┃ ┃ ┗ 📜UsersPage.jsx
┃ ┃ ┗ 📂winners
┃ ┃   ┗ 📜WinnersPage.jsx
┃ ┣ 📂router
┃ ┃ ┗ 📜router.jsx
┃ ┣ 📂services
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜AuthService.js
┃ ┃ ┣ 📂authorization
┃ ┃ ┃ ┗ 📜AuthorizationService.js
┃ ┃ ┣ 📂countries
┃ ┃ ┃ ┗ 📜CountryService.js
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜DashboardService.js
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┗ 📜AlertService.js
┃ ┃ ┣ 📂payments
┃ ┃ ┃ ┗ 📜paymentService.js
┃ ┃ ┣ 📂riffle
┃ ┃ ┃ ┗ 📜RiffleService.js
┃ ┃ ┣ 📂tickets
┃ ┃ ┃ ┗ 📜TicketService.js
┃ ┃ ┣ 📂users
┃ ┃ ┃ ┗ 📜UserService.js
┃ ┃ ┗ 📂winners
┃ ┃   ┗ 📜WinnersService.js
┃ ┣ 📂stores
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜useAuthStore.js
┃ ┃ ┣ 📂dashboard
┃ ┃ ┃ ┗ 📜useDashboardStore.js
┃ ┃ ┗ 📂users
┃ ┃   ┗ 📜useUserStore.js
┃ ┣ 📂utils
┃ ┃ ┣ 📂api
┃ ┃ ┃ ┣ 📜axios.js
┃ ┃ ┃ ┗ 📜headers.js
┃ ┃ ┣ 📂generic
┃ ┃ ┃ ┣ 📜constants.js
┃ ┃ ┃ ┣ 📜convertText.js
┃ ┃ ┃ ┣ 📜documentTypes.jsx
┃ ┃ ┃ ┣ 📜i18n.js
┃ ┃ ┃ ┣ 📜jwtDecode.js
┃ ┃ ┃ ┣ 📜securityValidations.js
┃ ┃ ┃ ┗ 📜transformDates.js
┃ ┃ ┣ 📂validations
┃ ┃ ┃ ┣ 📂authorizations
┃ ┃ ┃ ┃ ┗ 📜authorizationSchema.js
┃ ┃ ┃ ┣ 📂raffles
┃ ┃ ┃ ┃ ┗ 📜raffleSchema.js
┃ ┃ ┃ ┗ 📂users
┃ ┃ ┃   ┗ 📜userSchema.js
┃ ┃ ┗ 📜authHelpers.js
┃ ┣ 📂wrappers
┃ ┃ ┣ 📜AuthWrapper.jsx
┃ ┃ ┗ 📜ThemeWrapper.jsx
┃ ┣ 📜App.css
┃ ┣ 📜App.jsx
┃ ┣ 📜index.css
┃ ┗ 📜main.jsx
┣ 📜.env
┣ 📜.env.local.example
┣ 📜.eslintrc.json
┣ 📜.gitignore
┣ 📜.prettierignore
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