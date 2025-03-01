import { User } from '@auth0/auth0-spa-js';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
// import { Label } from '../../../sections/_examples/Block';
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  config: icon ('ic_setting'),
};


const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general',
    items: [
      { title: 'Inicio', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      // { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file }, 
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administración',
    items: [
      // // USER
      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
      //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
      //     { title: 'list', path: PATH_DASHBOARD.user.list },
      //     { title: 'create', path: PATH_DASHBOARD.user.new },
      //     { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
      //     { title: 'account', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
        // Empresa
        { title: 'Registrar Pedidos', path: PATH_DASHBOARD.pedidos.inicio, icon: ICONS.user },

        { title: 'Reportes', path: PATH_DASHBOARD.reportes.inicio, icon: ICONS.calendar },






     // {
     //   title: 'empresa',
     //   path: PATH_DASHBOARD.empresa.root,
     //   icon: ICONS.cart,
     //   roles: ['RecursosHumanos'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.empresa.list },
     //     { title: 'crear', path: PATH_DASHBOARD.empresa.new },
     //     // { title: 'editar', path: PATH_DASHBOARD.empresa.demoEdit },
     //     // { title: 'administrar', path: PATH_DASHBOARD.empresa.administrar },

     //   ],
     // },
     // // Empleado
     // {
     //   title: 'empleado',
     //   path: PATH_DASHBOARD.empleado.root,
     //   icon: ICONS.user,
     //   roles: ['RecursosHumanos', 'RHEmpresa', 'RHPerfiles'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.empleado.list },
     //     { title: 'crear', path: PATH_DASHBOARD.empleado.new },
     //     // { title: 'editar', path: PATH_DASHBOARD.empleado.demoEdit },
     //   ],
     // },
     //  // Empleado
     //  {
     //   title: 'empleados',
     //   path: PATH_DASHBOARD.empleados.administrar,
     //   icon: ICONS.user,
     //   roles: ['Admin'],
     //   children: [
     //     { title: 'administrar', path: PATH_DASHBOARD.empleados.administrar },
     //   ],
     // },
     // // Soporte Empleado
     // {
     //   title: 'soporte',
     //   path: PATH_DASHBOARD.empleadoSoporte.root,
     //   icon: ICONS.user,
     //   roles: ['Soporte'],
     //   children: [
     //       { title: 'empleados', path: PATH_DASHBOARD.empleadoSoporte.root },
     //       { title: 'Bandeja Errores', path: PATH_DASHBOARD.empleadoSoporte.logErrores },
     //   ],
     // },
     // // Area
     // {
     //   title: 'Área',
     //   path: PATH_DASHBOARD.area.root,
     //   icon: ICONS.ecommerce,
     //   roles: ['RecursosHumanos', 'RHEmpresa'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.area.list },
     //     { title: 'crear', path: PATH_DASHBOARD.area.new },
     //     // { title: 'administrar', path: PATH_DASHBOARD.area.administrar },

     //     // { title: 'editar', path: PATH_DASHBOARD.area.demoEdit },
     //   ],
     // },

     // // Departamento
     // {
     //   title: 'departamento',
     //   path: PATH_DASHBOARD.departamento.root,
     //   icon: ICONS.invoice,
     //   roles: ['RecursosHumanos', 'RHEmpresa'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.departamento.list },
     //     { title: 'crear', path: PATH_DASHBOARD.departamento.new },
     //   ],
     // },

     // // Puesto
     // {
     //   title: 'puesto',
     //   path: PATH_DASHBOARD.puesto.root,
     //   icon: ICONS.invoice,
     //   roles: ['RecursosHumanos', 'RHEmpresa'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.puesto.list },
     //     { title: 'crear', path: PATH_DASHBOARD.puesto.new },
     //     // { title: 'administrar', path: PATH_DASHBOARD.puesto.administrar },
     //   ],
     // },

     // // Vacaciones
     // {
     //   title: 'Vacaciones',
     //   path: PATH_DASHBOARD.vacaciones.root,
     //   icon: ICONS.calendar,
     //   roles: ['Admin', 'RecursosHumanos', 'Gerente', 'RHEmpresa'],
     //   children: [
     //     { title: 'Mis Vacaciones', path: PATH_DASHBOARD.vacaciones.inicio },
     //     { title: 'Solicitudes', path: PATH_DASHBOARD.vacaciones.solicitudes },
     //     // { title: 'Periodos', path: PATH_DASHBOARD.vacaciones.periodos },
     //     {
     //      title: 'Especiales',
     //      path: PATH_DASHBOARD.vacaciones.especiales,
     //      roles: ['Admin', 'RecursosHumanos', 'RHEmpresa'],
     //     },
     //     {
     //       title: 'Periodos',
     //       path: PATH_DASHBOARD.vacaciones.periodos,
     //       roles: ['Admin', 'RecursosHumanos', 'RHEmpresa'],
     //     },
     //   ],
     // },
      
     // {
     //   title: 'Vacaciones',
     //   path: PATH_DASHBOARD.misvacaciones.root,
     //   icon: ICONS.calendar,
     //   roles: ['Operador', 'Usuario', 'Soporte'],
     //   children: [
     //       { title: 'Mis Vacaciones', path: PATH_DASHBOARD.misvacaciones.inicio },
     //   ],
     // },
      
     // {
     //   title: 'Días Inhábiles',
     //   path: PATH_DASHBOARD.diasInhabiles.root,
     //   icon: ICONS.invoice,
     //   roles: ['Admin', 'RecursosHumanos', 'RHEmpresa'],
     //   children: [
     //     { title: 'lista', path: PATH_DASHBOARD.diasInhabiles.list},
     //     { title: 'crear', path: PATH_DASHBOARD.diasInhabiles.new },
     //     // { title: 'administrar', path: PATH_DASHBOARD.puesto.administrar },
     //   ],
     // }
      // Banco
      // {
      //   title: 'banco',
      //   path: PATH_DASHBOARD.banco.root,
      //   icon: ICONS.banking,
      //   roles: ['RecursosHumanos'],
      //   children: [
      //     { title: 'lista', path: PATH_DASHBOARD.banco.list },
      //     { title: 'crear', path: PATH_DASHBOARD.banco.new },
      //     // { title: 'editar', path: PATH_DASHBOARD.banco.demoEdit },
      //   ],
      // },

      // E-COMMERCE
      //  {
      //   title: 'ecommerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE
      // {
      //   title: 'invoice',
      //   path: PATH_DASHBOARD.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
      //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
      //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
      //   ],
      // },

      // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
      // {
      //   title: 'File manager',
      //   path: PATH_DASHBOARD.fileManager,
      //   icon: ICONS.folder,
      // }, 

    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //  subheader: 'app',
  //  items: [
  //    // {
  //    //  title: 'mail',
  //    //  path: PATH_DASHBOARD.mail.root,
  //    //      icon: ICONS.mail,
  //    //      info: <Label color="error">+32</Label>,
  //    // },
  //    {
  //      title: 'chat',
  //      path: PATH_DASHBOARD.chat.root,
  //      icon: ICONS.chat,
  //    },
  //    {
  //      title: 'calendar',
  //      path: PATH_DASHBOARD.calendar,
  //      icon: ICONS.calendar,
  //    },
  //    {
  //      title: 'kanban',
  //      path: PATH_DASHBOARD.kanban,
  //      icon: ICONS.kanban,
  //    },
  //  ],
  // },

  // DEMO MENU STATES
//   {
//     // subheader: 'Other cases',
//     items: [
//       {
//         // default roles : All roles can see this entry.
//         // roles: ['user'] Only users can see this item.
//         // roles: ['admin'] Only admin can see this item.
//         // roles: ['admin', 'manager'] Only admin/manager can see this item.
//         // Reference from 'src/guards/RoleBasedGuard'.
//         title: 'item_by_roles',
//         path: PATH_DASHBOARD.permissionDenied,
//         icon: ICONS.lock,
//         roles: ['Admin', "Gerente"],
//         caption: 'only_admin_can_see_this_item',
//       },

//       //     {
//       //       title: 'menu_level',
//       //       path: '#/dashboard/menu_level',
//       //       icon: ICONS.menuItem,
//       //       children: [
//       //         {
//       //           title: 'menu_level_2a',
//       //           path: '#/dashboard/menu_level/menu_level_2a',
//       //         },
//       //         {
//       //           title: 'menu_level_2b',
//       //           path: '#/dashboard/menu_level/menu_level_2b',
//       //           children: [
//       //             {
//       //               title: 'menu_level_3a',
//       //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
//       //             },
//       //             {
//       //               title: 'menu_level_3b',
//       //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
//       //               children: [
//       //                 {
//       //                   title: 'menu_level_4a',
//       //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
//       //                 },
//       //                 {
//       //                   title: 'menu_level_4b',
//       //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
//       //                 },
//       //               ],
//       //             },
//       //           ],
//       //         },
//       //       ],
//       //     },


//       //     {
//       //      title: 'item_disabled',
//       //      path: '#disabled',
//       //      icon: ICONS.disabled,
//       //      disabled: true,
//       //    },

//       //    // {
//       //    //  title: 'item_label',
//       //    //  path: '#label',
//       //    //  icon: ICONS.label,
//       //    //  info: (
//       //    //    <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
//       //    //      NEW
//       //    //    </Label>
//       //    //  ),
//       //    // },
//       //    {
//       //      title: 'item_caption',
//       //      path: '#caption',
//       //      icon: ICONS.menuItem,
//       //      caption:
//       //        'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
//       //    },
//       //    {
//       //      title: 'item_external_link',
//       //      path: 'https://www.google.com/',
//       //      icon: ICONS.external,
//       //    },

//       //    {
//       //      title: 'blank',
//       //      path: PATH_DASHBOARD.blank,
//       //      icon: ICONS.blank,
//       //    },
//     ],
//   },






];

export default navConfig;
