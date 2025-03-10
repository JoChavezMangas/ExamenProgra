// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  multilogin:'/multilogin'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  // mail: {
  //   root: path(ROOTS_DASHBOARD, '/mail'),
  //   all: path(ROOTS_DASHBOARD, '/mail/all'),
  // },
  // chat: {
  //   root: path(ROOTS_DASHBOARD, '/chat'),
  //   new: path(ROOTS_DASHBOARD, '/chat/new'),
  //   view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  // },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  empresa: {
    root: path(ROOTS_DASHBOARD, '/empresa'),
    list: path(ROOTS_DASHBOARD, '/empresa/list'),
    new: path(ROOTS_DASHBOARD, '/empresa/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/empresa/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/empresa/reece-chung/edit`),
    // administrar: path(ROOTS_DASHBOARD, '/empresa/administrar'),

  },
  empleado: {
    root: path(ROOTS_DASHBOARD, '/empleado'),
    list: path(ROOTS_DASHBOARD, '/empleado/list'),
    new: path(ROOTS_DASHBOARD, '/empleado/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/empleado/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/empleado/reece-chung/edit`),
  },
  empleadoSoporte: {
    root: path(ROOTS_DASHBOARD, '/empleadoSoporte'),
    list: path(ROOTS_DASHBOARD, '/empleadoSoporte/list'),
    logErrores: path(ROOTS_DASHBOARD, '/empleadoSoporte/logErrores'),
    edit: (name) => path(ROOTS_DASHBOARD, `/empleadoSoporte/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/empleadoSoporte/reece-chung/edit`),
  },
  empleados: {
    root: path(ROOTS_DASHBOARD, '/empleados'),
    list: path(ROOTS_DASHBOARD, '/empleados/list'),
    new: path(ROOTS_DASHBOARD, '/empleados/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/empleados/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/empleados/reece-chung/edit`),
    administrar: path(ROOTS_DASHBOARD, '/empleados/administrar')
  },
  area: {
    root: path(ROOTS_DASHBOARD, '/area'),
    list: path(ROOTS_DASHBOARD, '/area/list'),
    new: path(ROOTS_DASHBOARD, '/area/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/area/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/area/reece-chung/edit`),
    // administrar: path(ROOTS_DASHBOARD, '/area/administrar'),

  },

  departamento: {
    root: path(ROOTS_DASHBOARD, '/departamento'),
    list: path(ROOTS_DASHBOARD, '/departamento/list'),
    new: path(ROOTS_DASHBOARD, '/departamento/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/departamento/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/departamento/reece-chung/edit`),
  },
  
  puesto: {
    root: path(ROOTS_DASHBOARD, '/puesto'),
    list: path(ROOTS_DASHBOARD, '/puesto/list'),
    new: path(ROOTS_DASHBOARD, '/puesto/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/puesto/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/puesto/reece-chung/edit`),
    // administrar: path(ROOTS_DASHBOARD, `/puesto/administrar`),
  },

  vacaciones: {
    root: path(ROOTS_DASHBOARD, '/vacaciones'),
    inicio: path(ROOTS_DASHBOARD, '/vacaciones/inicio'),
    solicitudes: path(ROOTS_DASHBOARD, '/vacaciones/solicitudes'),
    periodos: path(ROOTS_DASHBOARD, '/vacaciones/periodos'),
    especiales: path(ROOTS_DASHBOARD, '/vacaciones/especiales'),
    edit: (name) => path(ROOTS_DASHBOARD, `/vacaciones/${name}/edit`),
  },

  diasInhabiles: {
    root: path(ROOTS_DASHBOARD, '/diasInhabiles'),
    list: path(ROOTS_DASHBOARD, '/diasInhabiles/list'),
    new: path(ROOTS_DASHBOARD, '/diasInhabiles/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/diasInhabiles/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/diasInhabiles/reece-chung/edit`),
    // administrar: path(ROOTS_DASHBOARD, `/puesto/administrar`),
  },

  misvacaciones: {
    root: path(ROOTS_DASHBOARD, '/misvacaciones'),
    inicio: path(ROOTS_DASHBOARD, '/misvacaciones/inicio'),
  },


 inicio: {
    root: path(ROOTS_DASHBOARD, '/app')
  },

  reportes: {
    root: path(ROOTS_DASHBOARD, '/reportes'),
    inicio: path(ROOTS_DASHBOARD, '/reportes/ReportesIndex')
  },

  pedidos: {
    root: path(ROOTS_DASHBOARD, '/pedidos'),
    inicio: path(ROOTS_DASHBOARD, '/pedidos/PedidosIndex')
  },





  // banco: {
  //   root: path(ROOTS_DASHBOARD, '/banco'),
  //   list: path(ROOTS_DASHBOARD, '/banco/list'),
  //   new: path(ROOTS_DASHBOARD, '/banco/new'),
  //   edit: (name) => path(ROOTS_DASHBOARD, `/banco/${name}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, `/banco/reece-chung/edit`),
  // },
  // eCommerce: {
  //   root: path(ROOTS_DASHBOARD, '/e-commerce'),
  //   shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
  //   list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
  //   checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
  //   new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
  //   view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
  //   edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
  //   demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  // },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  // blog: {
  //   root: path(ROOTS_DASHBOARD, '/blog'),
  //   posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //   new: path(ROOTS_DASHBOARD, '/blog/new'),
  //   view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  //   demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  // },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
