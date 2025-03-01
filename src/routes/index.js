
// Hoja para Crear Rutas

import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralFilePage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralAnalyticsPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,

  // Dashboard: Empresa
  EmpresaListPage,
  EmpresaEditPage,
  EmpresaCreatePage,
  // AdministrarEmpresa,

  // Dashboard: Empleado
  EmpleadoListPage,
  EmpleadoEditPage,
  EmpleadoCreatePage,
  AdministrarEmpleados,

  EmpleadoSoporte,
  LogErrores,
  EmpleadoSoporteEditar,
  // Dashboard: Area
  AreaListPage,
  AreaEditPage,
  AreaCreatePage,
  // AdministrarArea,

  // Dashboard: Departamento
  DepartamentoListPage,
  DepartamentoEditPage,
  DepartamentoCreatePage,

  // Dashboard: Puesto
  PuestoListPage,
  PuestoEditPage,
  PuestoCreatePage,
  // AdministrarPuesto,

  // Vacaciones
  InicioVacaciones,
  InicioPeticiones,
  Periodos,
  Especiales,
  BalanceEmpleadoVacaciones, 
  // Mis Vacaciones
  // InicioMisVacaciones,

  DiasInhabilesListPage,
  DiasInhabilesEditPage,
  DiasInhabilesCreatePage,

  // Reportes
  ReportesVacaciones,
  ReportesPersonales,
  ReportesIndex,
  ReportesSolicitudes,
  // Dashboard: Banco
  // BancoListPage,
  // BancoEditPage,
  // BancoCreatePage,

  // Dashboard: Ecommerce
  // EcommerceShopPage,
  // EcommerceCheckoutPage,
  // EcommerceProductListPage,
  // EcommerceProductEditPage,
  // EcommerceProductCreatePage,
  // EcommerceProductDetailsPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  // BlogPostsPage,
  // BlogPostPage,
  // BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  //
  Page500,
  Page403,
  Page404,
  HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
  Multilogin,
  //
  ComponentsOverviewPage,
  FoundationColorsPage,
  FoundationTypographyPage,
  FoundationShadowsPage,
  FoundationGridPage,
  FoundationIconsPage,
  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
  DemoMarkdownPage,
  PedidosIndex,

  
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        // {
        //   path: 'e-commerce',
        //   children: [
        //     { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
        //     { path: 'shop', element: <EcommerceShopPage /> },
        //     { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
        //     { path: 'list', element: <EcommerceProductListPage /> },
        //     { path: 'product/new', element: <EcommerceProductCreatePage /> },
        //     { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
        //     { path: 'checkout', element: <EcommerceCheckoutPage /> },
        //   ],
        // },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'empresa',
          children: [
            { element: <Navigate to="/dashboard/empresa/list" replace />, index: true },
            { path: 'list', element: <EmpresaListPage /> },
            { path: 'new', element: <EmpresaCreatePage /> },
            { path: ':name/edit', element: <EmpresaEditPage /> },         
            // { path: 'administrar', element: <AdministrarEmpresa /> },

          ],
        },
        {
          path: 'empleado',
          children: [
            { element: <Navigate to="/dashboard/empleado/list" replace />, index: true },
            { path: 'list', element: <EmpleadoListPage /> },
            { path: 'new', element: <EmpleadoCreatePage /> },
            { path: ':name/edit', element: <EmpleadoEditPage /> },
          ],
        },
        {
          path: 'empleadoSoporte',
          children: [
            { element: <Navigate to="/dashboard/empleadoSoporte/list" replace />, index: true },
            { path: 'list', element: <EmpleadoSoporte /> },
            { path: 'logErrores', element: <LogErrores /> },
            { path: ':name/edit', element: <EmpleadoSoporteEditar /> },
          ],
        },
        {
          path: 'empleados',
          children: [
            { element: <Navigate to="/dashboard/empleados/list" replace />, index: true },
            { path: 'list', element: <EmpleadoListPage /> },
            { path: 'new', element: <EmpleadoCreatePage /> },
            { path: ':name/edit', element: <EmpleadoEditPage /> },
            { path: 'administrar', element: <AdministrarEmpleados /> },
          ],
        },
        {
          path: 'area',
          children: [
            { element: <Navigate to="/dashboard/area/list" replace />, index: true },
            { path: 'list', element: <AreaListPage /> },
            { path: 'new', element: <AreaCreatePage /> },
            { path: ':name/edit', element: <AreaEditPage /> }, 
            // { path: 'administrar', element: <AdministrarArea /> },

          ],
        },
        {
          path: 'departamento',
          children: [
            { element: <Navigate to="/dashboard/departamento/list" replace />, index: true },
            { path: 'list', element: <DepartamentoListPage /> },
            { path: 'new', element: <DepartamentoCreatePage /> },
            { path: ':name/edit', element: <DepartamentoEditPage /> },
            // { path: 'administrar', element: <AdministrarPuesto/> },
          ],
        },
        {
          path: 'puesto',
          children: [
            { element: <Navigate to="/dashboard/puesto/list" replace />, index: true },
            { path: 'list', element: <PuestoListPage /> },
            { path: 'new', element: <PuestoCreatePage /> },
            { path: ':name/edit', element: <PuestoEditPage /> },
            // { path: 'administrar', element: <AdministrarPuesto/> },
          ],
        },
        {
            path: 'Vacaciones',
            children: [
                { element: <Navigate to="/dashboard/vacaciones/inicio" replace />, index: true },
                { path: 'inicio', element: <InicioVacaciones /> },
                { path: 'solicitudes', element: <InicioPeticiones /> },
                { path: 'periodos', element: <Periodos /> },
                { path: 'especiales', element: <Especiales/> },
                { path: ':name/edit', element: <BalanceEmpleadoVacaciones /> },
              ],
        },
        {
          path: 'diasInhabiles',
          children: [
            { element: <Navigate to="/dashboard/diasInhabiles/list" replace />, index: true },
            { path: 'list', element: <DiasInhabilesListPage /> },
            { path: 'new', element: <DiasInhabilesCreatePage /> },
            { path: ':name/edit', element: <DiasInhabilesEditPage /> },
            // { path: 'administrar', element: <AdministrarPuesto/> },
          ],
        },
        {
          path: 'misvacaciones',
          children: [
              { element: <Navigate to="/dashboard/misvacaciones/inicio" replace />, index: true },
              { path: 'inicio', element: <InicioVacaciones /> },
          ],
      },
      {
        path: 'reportes',
        children: [
            { element: <Navigate to="/dashboard/reportes" replace />, index: true },
            { path: 'ReportesIndex', element: <ReportesIndex /> }
        ],
       },
        {
            path: 'pedidos',
            children: [
                { element: <Navigate to="/dashboard/pedidos" replace />, index: true },
                { path: 'PedidosIndex', element: <PedidosIndex /> }
            ],
        },
        // {
        //   path: 'banco',
        //   children: [
        //     { element: <Navigate to="/dashboard/banco/list" replace />, index: true },
        //     { path: 'list', element: <BancoListPage /> },
        //     { path: 'new', element: <BancoCreatePage /> },
        //     { path: ':name/edit', element: <BancoEditPage /> },
        //   ],
        // },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        // {
        //   path: 'blog',
        //   children: [
        //     { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
        //     { path: 'posts', element: <BlogPostsPage /> },
        //     { path: 'post/:title', element: <BlogPostPage /> },
        //     { path: 'new', element: <BlogNewPostPage /> },
        //   ],
        // },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
       element: <MainLayout />,
      // element: (
      //      <GuestGuard>
      //          <LoginPage />
      //      </GuestGuard>
      //  ),
      
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <FaqsPage /> },
        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsOverviewPage />, index: true },
            {
              path: 'foundation',
              children: [
                { element: <Navigate to="/components/foundation/colors" replace />, index: true },
                { path: 'colors', element: <FoundationColorsPage /> },
                { path: 'typography', element: <FoundationTypographyPage /> },
                { path: 'shadows', element: <FoundationShadowsPage /> },
                { path: 'grid', element: <FoundationGridPage /> },
                { path: 'icons', element: <FoundationIconsPage /> },
              ],
            },
            {
              path: 'mui',
              children: [
                { element: <Navigate to="/components/mui/accordion" replace />, index: true },
                { path: 'accordion', element: <MUIAccordionPage /> },
                { path: 'alert', element: <MUIAlertPage /> },
                { path: 'autocomplete', element: <MUIAutocompletePage /> },
                { path: 'avatar', element: <MUIAvatarPage /> },
                { path: 'badge', element: <MUIBadgePage /> },
                { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
                { path: 'buttons', element: <MUIButtonsPage /> },
                { path: 'checkbox', element: <MUICheckboxPage /> },
                { path: 'chip', element: <MUIChipPage /> },
                { path: 'data-grid', element: <MUIDataGridPage /> },
                { path: 'dialog', element: <MUIDialogPage /> },
                { path: 'list', element: <MUIListPage /> },
                { path: 'menu', element: <MUIMenuPage /> },
                { path: 'pagination', element: <MUIPaginationPage /> },
                { path: 'pickers', element: <MUIPickersPage /> },
                { path: 'popover', element: <MUIPopoverPage /> },
                { path: 'progress', element: <MUIProgressPage /> },
                { path: 'radio-button', element: <MUIRadioButtonsPage /> },
                { path: 'rating', element: <MUIRatingPage /> },
                { path: 'slider', element: <MUISliderPage /> },
                { path: 'stepper', element: <MUIStepperPage /> },
                { path: 'switch', element: <MUISwitchPage /> },
                { path: 'table', element: <MUITablePage /> },
                { path: 'tabs', element: <MUITabsPage /> },
                { path: 'textfield', element: <MUITextFieldPage /> },
                { path: 'timeline', element: <MUITimelinePage /> },
                { path: 'tooltip', element: <MUITooltipPage /> },
                { path: 'transfer-list', element: <MUITransferListPage /> },
                { path: 'tree-view', element: <MUITreesViewPage /> },
              ],
            },
            {
              path: 'extra',
              children: [
                { element: <Navigate to="/components/extra/animate" replace />, index: true },
                { path: 'animate', element: <DemoAnimatePage /> },
                { path: 'carousel', element: <DemoCarouselsPage /> },
                { path: 'chart', element: <DemoChartsPage /> },
                { path: 'copy-to-clipboard', element: <DemoCopyToClipboardPage /> },
                { path: 'editor', element: <DemoEditorPage /> },
                { path: 'form-validation', element: <DemoFormValidationPage /> },
                { path: 'image', element: <DemoImagePage /> },
                { path: 'label', element: <DemoLabelPage /> },
                { path: 'lightbox', element: <DemoLightboxPage /> },
                { path: 'map', element: <DemoMapPage /> },
                { path: 'mega-menu', element: <DemoMegaMenuPage /> },
                { path: 'multi-language', element: <DemoMultiLanguagePage /> },
                { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
                { path: 'organization-chart', element: <DemoOrganizationalChartPage /> },
                { path: 'scroll', element: <DemoScrollbarPage /> },
                { path: 'snackbar', element: <DemoSnackbarPage /> },
                { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
                { path: 'upload', element: <DemoUploadPage /> },
                { path: 'markdown', element: <DemoMarkdownPage /> },
              ],
            },
          ],
        },
      ],
      
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },
        { path: 'login', element: <PaymentPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: 'multilogin', element: <Multilogin/> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
