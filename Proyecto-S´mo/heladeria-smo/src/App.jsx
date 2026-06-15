import { useState } from 'react'

// Fotos reales desde tu carpeta assets
import bannerVitrina from './assets/vitrina-principal-1.jpeg'
import fotoPotesReal from './assets/potes-helado.jpeg'

export default function App() {
  const [poteSeleccionado, setPoteSeleccionado] = useState(null)
  const [gustosSeleccionados, setGustosSeleccionados] = useState([])
  const [carrito, setCarrito] = useState([])
  
  // Controles de interfaz
  const [categoriaGustoAbierta, setCategoriaGustoAbierta] = useState(null)
  const [categoriaExtraAbierta, setCategoriaExtraAbierta] = useState(null)
  const [cantidadPote, setCantidadPote] = useState(1) // Nuevo selector de cantidad pre-carrito
  
  // LOGÍSTICA
  const [metodoEntrega, setMetodoEntrega] = useState('Local') // 'Local' o 'Delivery'

  // =========================================================================
  // 1. POTES (Precios Reales)
  // =========================================================================
  const opcionesPotes = [
    { id: '2kg_promo', nombre: 'PROMO 2 Kilos (Efectivo)', limite: 4, precio: 37400, detalle: '4 gustos por pote. Efectivo.' },
    { id: '1kg', nombre: 'Pote de 1 KG', limite: 4, precio: 22000, detalle: 'Hasta 4 sabores' },
    { id: '34kg', nombre: 'Pote de 3/4 KG', limite: 4, precio: 17000, detalle: 'Hasta 4 sabores' },
    { id: 'promo_14_14', nombre: 'PROMO 1/4 + 1/4', limite: 3, precio: 15300, detalle: 'Hasta 3 sabores por pote' },
    { id: '12kg', nombre: 'Pote de 1/2 KG', limite: 4, precio: 10200, detalle: 'Hasta 4 sabores' },
    { id: '14kg', nombre: 'Pote de 1/4 KG', limite: 3, precio: 9000, detalle: 'Hasta 3 sabores' }
  ]

  // =========================================================================
  // 2. GUSTOS CON DESCRIPCIONES TENTADORAS
  // =========================================================================
  const listadoGustos = {
    'CHOCOLATES': [
      { nombre: 'Chocolate', desc: 'Clásico cacao suave y cremoso.' }, 
      { nombre: 'Chocolate Al Oporto Con Nuez', desc: 'Cacao infusionado con vino oporto y nueces.' }, 
      { nombre: 'Chocolate Amargo', desc: 'Cacao intenso al 70% de pureza.' }, 
      { nombre: 'Chocolate Blanco', desc: 'Crema sedosa de manteca de cacao premium.' }, 
      { nombre: 'Chocolate Con Menta', desc: 'Cacao intenso con refrescante esencia de menta.' }, 
      { nombre: 'Chocolate Escoces', desc: 'Con dulce de leche repostero y trozos de chocolate.' },
      { nombre: 'Chocolate Manjar Blanco', desc: 'Suave crema de chocolate con hilos de manjar.' }, 
      { nombre: 'Chocolate Marroc', desc: 'Chocolate con leche y clásica pasta de maní.' }, 
      { nombre: 'Chocolate Nugaton', desc: 'Crema de chocolate con crujiente oblea bañada.' },
      { nombre: 'Choconui', desc: 'Intenso sabor a cacao con crema de avellanas.' }, 
      { nombre: 'Chocolate Rocher', desc: 'Inspirado en el bombón con avellanas y chocolate.' }, 
      { nombre: 'Chocolate Selva Negra', desc: 'Con cerezas al marrasquino y bizcochuelo.' },
      { nombre: 'Chocolate Shot', desc: 'Chocolate con leche y trozos de maní tostado.' }, 
      { nombre: 'Chocolate Suizo', desc: 'Chocolate amargo, dulce de leche natural y nueces.' }, 
      { nombre: 'Chocolate Supremo', desc: 'Doble cacao con chips de chocolate amargo.' },
      { nombre: 'Chocotap', desc: 'Base de chocolate con tapas de alfajor.' }, 
      { nombre: 'Chocolate Dubai (Nuevo)', desc: 'Cacao premium con pistacho y kinefe crocante.' }, 
      { nombre: 'Mousse de Chocolate', desc: 'Textura aireada, suave y profunda.' }
    ],
    'DULCES DE LECHE': [
      { nombre: 'Dulce De Leche', desc: 'El clásico argentino, textura lisa y brillante.' }, 
      { nombre: 'Dulce De Leche Borguese', desc: 'Receta italiana extra cremosa.' }, 
      { nombre: 'Dulce De Leche Brownie', desc: 'Con trozos húmedos de brownie artesanal.' },
      { nombre: 'Dulce De Leche Con Nuez', desc: 'Con nueces pecan partidas y tostadas.' }, 
      { nombre: 'Dulce De Leche Con Oreo', desc: 'Veteado con galletitas Oreo trituradas.' }, 
      { nombre: 'Dulce De Leche Fiesta (Mym)', desc: 'Con coloridos confites de chocolate.' },
      { nombre: 'Dulce De Leche Granizado', desc: 'Con sutiles escamas de chocolate amargo.' }, 
      { nombre: 'Dulce De Leche Havanna', desc: 'Sabor intenso inspirado en el famoso alfajor.' }, 
      { nombre: 'Dulce De Leche Nutella', desc: 'Con tentadores hilos de crema de avellanas.' },
      { nombre: 'Dulce De Leche S´mo', desc: 'Nuestra especialidad con agregados premium.' }, 
      { nombre: 'Dulce De Leche Vauquita', desc: 'Con trozos de la clásica tableta dulce.' }, 
      { nombre: 'Dulce De Leche Bajonero (Nuevo)', desc: 'Explosión dulce con múltiples agregados.' }
    ],
    'CREMAS Y POSTRES': [
      { nombre: 'Americana', desc: 'Crema de vainilla clásica y suave.' }, 
      { nombre: 'Avellanas Con Bon O Bon', desc: 'Crema de avellanas con bombones enteros.' }, 
      { nombre: 'Banana', desc: 'Crema suave de plátano natural.' }, 
      { nombre: 'Banana Split', desc: 'Banana con hilos de chocolate y dulce de leche.' }, 
      { nombre: 'Mix De Banana', desc: 'Batido especial frutal de la casa.' }, 
      { nombre: 'Bianco', desc: 'Crema blanca pura y sedosa.' }, 
      { nombre: 'Cafe Moka', desc: 'Intenso sabor a café tostado con cacao.' }, 
      { nombre: 'Candy', desc: 'Crema dulce ideal para los más chicos.' }, 
      { nombre: 'Cereza A La Panna', desc: 'Crema suave con cerezas enteras dulces.' }, 
      { nombre: 'Coco c/ DL', desc: 'Crema de coco rallado veteada con dulce de leche.' }, 
      { nombre: 'Crema De Higo', desc: 'Sabor delicado a higos de estación.' }, 
      { nombre: 'Crema Del Cielo', desc: 'Clásica crema celeste americana.' }, 
      { nombre: 'Crema Granizada', desc: 'Crema de vainilla con chips de chocolate.' }, 
      { nombre: 'Crema Magica (Oreo)', desc: 'Crema americana repleta de Oreo.' }, 
      { nombre: 'Crema Rusa', desc: 'Con nueces picadas finamente.' }, 
      { nombre: 'Mantecol', desc: 'Sabor auténtico a la pasta de maní dulce.' }, 
      { nombre: 'Menta Granizada', desc: 'Menta fresca con chips de chocolate negro.' }, 
      { nombre: 'Pannacotta', desc: 'Típico postre italiano hecho helado.' }, 
      { nombre: 'Pistacho', desc: 'Pistacho tostado tradicional.' }, 
      { nombre: 'Pistacho S´mo (Nuevo)', desc: 'Pistacho premium con textura intensa.' }, 
      { nombre: 'Rafaelo', desc: 'Inspirado en el bombón de coco y almendra.' }, 
      { nombre: 'Sambayon', desc: 'Crema de yemas batidas al vino oporto.' }, 
      { nombre: 'Sambayon Con Almendras', desc: 'El clásico con almendras tostadas.' }, 
      { nombre: 'Sambayon S´mo', desc: 'Receta especial y secreta de la casa.' }, 
      { nombre: 'Serenito', desc: 'Sabor al clásico postrecito de vainilla.' }, 
      { nombre: 'Tiramisu', desc: 'Con mascarpone, café y cacao.' }, 
      { nombre: 'Tramontana', desc: 'Crema americana, dulce de leche y galletas.' }, 
      { nombre: 'Vainilla', desc: 'Elaborada con esencia natural.' }, 
      { nombre: 'Yogurt S´mo', desc: 'Yogurt natural cremoso y sutil.' }, 
      { nombre: 'Delicia Italiana (Nuevo)', desc: 'Mezcla de cremas premium europeas.' }, 
      { nombre: 'Alfajor 70%', desc: 'Helado oscuro inspirado en alfajor premium.' }, 
      { nombre: 'Dulce Roguel (Nuevo)', desc: 'Crema con merengue y dulce de leche repostero.' }
    ],
    'FRUTALES A LA CREMA': [
      { nombre: 'Fantasia De Frutilla', desc: 'Mix cremoso frutal a base de frutilla.' }, 
      { nombre: 'Frutilla A La Crema', desc: 'Frutillas batidas con crema de leche fresca.' }, 
      { nombre: 'Frutilla Italiana', desc: 'Receta europea súper cremosa.' }, 
      { nombre: 'Mousse De Limon', desc: 'Espuma cremosa y cítrica.' }, 
      { nombre: 'Mousse De Maracuya', desc: 'Crema suave y tropical de maracuyá.' }
    ],
    'FRUTALES AL AGUA (SIN LÁCTEOS)': [
      { nombre: 'Anana Al Agua', desc: 'Jugo natural de ananá. 100% frutal.' }, 
      { nombre: 'Durazno Al Agua', desc: 'Duraznos licuados súper refrescantes.' }, 
      { nombre: 'Frutilla Al Agua', desc: 'Pura pulpa de frutilla natural.' }, 
      { nombre: 'Frutos Del Bosque Al Agua', desc: 'Mix de frutos rojos patagónicos.' }, 
      { nombre: 'Limon Al Agua', desc: 'Jugo de limón exprimido. Ultra refrescante.' }, 
      { nombre: 'Manzana Al Agua', desc: 'Suave y dulce, de manzanas verdes y rojas.' }, 
      { nombre: 'Melon Al Agua', desc: 'Melón fresco recién licuado.' }, 
      { nombre: 'Pera Con Frutillas Al Agua', desc: 'Combinación dulce 100% natural.' }
    ]
  }

  // =========================================================================
  // 3. PASTELERÍA Y PALETAS 
  // =========================================================================
  const catalogoExtras = {
    'TORTAS GRANDES (8 a 12 porc.)': [
      { id: 'tg_marroc', nombre: 'Torta Marroc', precio: 40000, detalle: 'Base de chocolate, mousse de marroc y baño de chocolate.' },
      { id: 'tg_oreo', nombre: 'Torta Oreo', precio: 40000, detalle: 'Base de galleta, crema americana y trozos de oreo.' },
      { id: 'tg_tiramisu', nombre: 'Torta Tiramisu', precio: 40000, detalle: 'Mascarpone, vainillas al café y cacao amargo.' },
      { id: 'tg_mascarpone', nombre: 'Mascarpone Frutos Rojos', precio: 40000, detalle: 'Crema de mascarpone con salsa de frutos patagónicos.' },
      { id: 'tg_delicia', nombre: 'Torta Delicia', precio: 40000, detalle: 'Mascarpone, crema de pistacho y amarenas.' }
    ],
    'TORTAS CHICAS Y CAFETERÍA': [
      { id: 'tc_marroc', nombre: 'Mini Marroc', precio: 12000, detalle: 'Versión individual de nuestra clásica torta Marroc.' },
      { id: 'tc_oreo', nombre: 'Mini Oreo', precio: 12000, detalle: 'Versión individual con mucha crema y galleta.' },
      { id: 'tc_tiramisu', nombre: 'Mini Tiramisu', precio: 12000, detalle: 'Postre italiano individual.' },
      { id: 'tc_mascarpone', nombre: 'Mascarpone Frutos del Bosque', precio: 12000, detalle: 'Versión individual con salsa de frutos rojos.' },
      { id: 'tc_delicia', nombre: 'Mini Delicia', precio: 12000, detalle: 'El postre premium de la casa en porción.' },
      { id: 'tc_cheesecake', nombre: 'Cheesecake', precio: 12000, detalle: 'Clásico cheesecake al estilo NY con frutos rojos.' },
      { id: 'tc_chocotorta', nombre: 'Chocotorta', precio: 12000, detalle: 'La clásica argentina con galletas y dulce de leche.' },
      { id: 'tc_brownie', nombre: 'Brownie con dulce', precio: 12000, detalle: 'Húmedo de chocolate con dulce de leche y merengue.' }
    ],
    'PALETAS DE CREMA': [
      { id: 'pc_americana', nombre: 'Americana', precio: 5050, detalle: 'Bañada en cobertura de chocolate crujiente.' },
      { id: 'pc_bianco', nombre: 'Bianco (Kinder)', precio: 5050, detalle: 'Baño de chocolate blanco y kinder.' },
      { id: 'pc_amargo', nombre: 'Chocolate Amargo', precio: 5050, detalle: 'Intensa, bañada en chocolate 70%.' },
      { id: 'pc_frutos', nombre: 'Choco Frutos del Bosque', precio: 5050, detalle: 'Rellena de salsa de frutos patagónicos.' },
      { id: 'pc_escoces', nombre: 'Chocolate Escoces', precio: 5050, detalle: 'Con corazón de dulce de leche.' },
      { id: 'pc_oreoblanco', nombre: 'Oreo Blanco', precio: 5050, detalle: 'Bañada en chocolate blanco crocante.' },
      { id: 'pc_nutella', nombre: 'Dulce Nutella', precio: 5050, detalle: 'Rellena de pura crema de avellanas.' },
      { id: 'pc_flynn', nombre: 'Flynn Paff', precio: 5050, detalle: 'Con copón de azúcar dulce.' },
      { id: 'pc_frutilla', nombre: 'Frutilla Italiana', precio: 5050, detalle: 'Bañada en chocolate blanco.' },
      { id: 'pc_menta', nombre: 'Menta', precio: 5050, detalle: 'Menta fresca con Oreo y chocolate.' },
      { id: 'pc_dloreo', nombre: 'Dulce de Leche Oreo', precio: 5050, detalle: 'Baño de choco blanco y galleta Oreo.' },
      { id: 'pc_oreonegro', nombre: 'Oreo Negro', precio: 5050, detalle: 'Base de dulce de leche y chocolate.' },
      { id: 'pc_vainilla', nombre: 'Vainilla', precio: 5050, detalle: 'Bañada en dulce de leche natural.' }
    ],
    'PALETAS FRUTALES Y EXTRAS': [
      { id: 'pa_kiwi', nombre: 'Paleta Kiwi Frutilla', precio: 4050, detalle: 'Paleta al agua 100% frutal y natural.' },
      { id: 'pa_mango', nombre: 'Paleta Mango Maracuya', precio: 4050, detalle: 'Mix tropical al agua.' },
      { id: 'ad_cucuruchos', nombre: 'Blister de Cucuruchos', precio: 3500, detalle: 'Vienen 3 unidades súper crocantes.' }
    ]
  }

  // =========================================================================
  // FUNCIONES DE CARRITO (Blindaje contra NaN y sumador múltiple)
  // =========================================================================
  const seleccionarGusto = (nombreGusto) => {
    if (!poteSeleccionado) return

    if (gustosSeleccionados.includes(nombreGusto)) {
      setGustosSeleccionados(gustosSeleccionados.filter(g => g !== nombreGusto))
    } else {
      if (gustosSeleccionados.length < poteSeleccionado.limite) {
        setGustosSeleccionados([...gustosSeleccionados, nombreGusto])
      } else {
        alert(`El ${poteSeleccionado.nombre} admite un máximo de ${poteSeleccionado.limite} gustos.`)
      }
    }
  }

  const agregarPoteAlCarrito = () => {
  if (!poteSeleccionado || gustosSeleccionados.length === 0) return;

  // NUEVA LÓGICA: Si es la promo 1/4+1/4, verificamos si ya completamos los gustos
  // (Esto requiere un pequeño ajuste que te pediré hacer más adelante)
  
  setCarrito(prev => {
    const gustosStr = [...gustosSeleccionados].sort().join(',');
    const indexExistente = prev.findIndex(item => 
      item.nombre === poteSeleccionado.nombre && 
      item.tipo === 'Pote' &&
      [...item.gustos].sort().join(',') === gustosStr
    );

    if (indexExistente !== -1) {
      const nuevoCarrito = [...prev];
      nuevoCarrito[indexExistente] = { 
        ...nuevoCarrito[indexExistente], 
        cantidad: (nuevoCarrito[indexExistente].cantidad || 1) + cantidadPote 
      };
      return nuevoCarrito;
    } else {
      const nuevoItem = { 
        id: Date.now().toString() + Math.random().toString(), 
        tipo: 'Pote', 
        nombre: poteSeleccionado.nombre, 
        precio: poteSeleccionado.precio, 
        cantidad: cantidadPote, 
        gustos: gustosSeleccionados 
      };
      return [...prev, nuevoItem];
    }
  });

  // Solo reseteamos si no es una promoción que requiera más pasos
  if (!poteSeleccionado.id.includes('promo')) {
    setPoteSeleccionado(null);
    setGustosSeleccionados([]);
    setCategoriaGustoAbierta(null);
    setCantidadPote(1);
  } else {
    // Si es promo, dejamos el pote seleccionado pero vaciamos gustos para el siguiente paso
    setGustosSeleccionados([]);
    alert("¡Perfecto! Ahora elegí los gustos para la segunda parte de la promo.");
  }
};

  }

  const agregarExtraAlCarrito = (producto) => {
    setCarrito(prev => {
      const indexExistente = prev.findIndex(item => item.nombre === producto.nombre && item.tipo === 'Extra')
      
      if (indexExistente !== -1) {
        const nuevoCarrito = [...prev]
        nuevoCarrito[indexExistente] = { 
          ...nuevoCarrito[indexExistente], 
          cantidad: (nuevoCarrito[indexExistente].cantidad || 1) + 1 
        }
        return nuevoCarrito
      } else {
        const nuevoItem = { 
          id: Date.now().toString() + Math.random().toString(), 
          tipo: 'Extra', 
          nombre: producto.nombre, 
          precio: producto.precio, 
          cantidad: 1,
          gustos: [] 
        }
        return [...prev, nuevoItem]
      }
    })
  }

  const modificarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const cantidadActual = item.cantidad || 1
        return { ...item, cantidad: cantidadActual + delta }
      }
      return item
    }).filter(item => item.cantidad > 0))
  }

  const eliminarItem = (id) => {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;

    // Validación para Delivery
    if (metodoEntrega === 'Delivery') {
      if (!direccion || direccion.trim() === '') {
        alert("¡Por favor, ingresá una dirección para el envío!");
        return;
      }
      
      // Validación de monto mínimo (ejemplo: mínimo $15000 para delivery)
      if (calcularTotal() < 15000) {
        alert("Para envíos a domicilio el pedido mínimo es de $15.000");
        return;
      }
    }

    let detalleTexto = '';
    carrito.forEach((item) => {
      const cant = item.cantidad || 1;
      if (item.tipo === 'Pote') {
        detalleTexto += `[${cant}x] ${item.nombre} ($${item.precio * cant}):\n`;
        item.gustos.forEach(g => { detalleTexto += `   - ${g}\n`; });
      } else {
        detalleTexto += `[${cant}x] ${item.nombre} ($${item.precio * cant})\n`;
      }
    });

    const mensaje = `*NUEVO PEDIDO DESDE LA APP*\n` +
                    `============================\n\n` +
                    `*ENTREGA:* ${metodoEntrega === 'Delivery' ? 'Entrega a domicilio' : 'Paso a Retirar por Local'}\n` +
                    (metodoEntrega === 'Delivery' ? `*DIRECCIÓN:* ${direccion}\n\n` : '\n') +
                    `*DETALLE DE COMPRA:*\n${detalleTexto}\n` +
                    `============================\n` +
                    `*TOTAL ABONADO: $${calcularTotal()}*\n` +
                    `============================\n\n` +
                    `*MÉTODO DE PAGO: Mercado Pago / Transferencia*\n` +
                    `_(Te adjunto el comprobante de pago a continuación)_`;

    const url = `https://wa.me/5491154229565?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const obtenerEstiloGusto = (nombre, estaSeleccionado) => {
    if (nombre.includes('Chocolate')) return estaSeleccionado ? 'bg-[#f7e6db] border-[#b87333] text-[#6a3b1e]' : 'bg-[#fffcfb] border-[#f3e1d3] text-[#6a3b1e]'
    if (nombre.includes('Dulce De Leche')) return estaSeleccionado ? 'bg-[#f5ebd7] border-[#c69c6d] text-[#5c3a21]' : 'bg-[#fffdf9] border-[#ede2d0] text-[#5c3a21]'
    if (nombre.includes('Frutilla') || nombre.includes('Mousse') || nombre.includes('Agua')) return estaSeleccionado ? 'bg-[#fff0f5] border-[#f48fb1] text-[#ad1457]' : 'bg-white border-[#fce4ec] text-[#ad1457]'
    return estaSeleccionado ? 'bg-[#eef5e9] border-[#7da068] text-[#3b5323]' : 'bg-white border-[#e8f0e0] text-[#3b5323]'
  
  return (
    <div class="bg-[#e2ebe6] text-[#2c221e] font-sans min-h-screen flex flex-col justify-between selection:bg-amber-100">
      
      {/* HERO BANNER */}
      <div class="relative h-96 flex items-center justify-center overflow-hidden">
        <img src={bannerVitrina} alt="Vitrina S´mo" class="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.70] contrast-[1.1]" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#e2ebe6] via-transparent to-black/30"></div>
        <div class="relative text-center z-10 px-6 max-w-lg mt-12">
          <span class="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] tracking-[0.25em] font-black uppercase px-5 py-2 rounded-full mb-4 border border-white/30 shadow-xs">
            La dulce tentación
          </span>
          <h1 class="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-xl uppercase leading-none">
            Heladería <br /> S´mo
          </h1>
          <p class="text-sm font-semibold text-slate-100 mt-5 tracking-wide drop-shadow-xs">
            Diseñá tu combinación artesanal y enviala directo a producción.
          </p>
        </div>
      </div>

      {/* CONTENIDO INTERACTIVO */}
      <main class="max-w-2xl mx-auto p-5 w-full flex-1 space-y-8 -mt-10 relative z-20">
        
        {/* PASO 0: LOGÍSTICA */}
        <div class="bg-white p-2 rounded-2xl border border-[#cbdad0] shadow-xl flex justify-between items-center gap-2">
          <button onClick={() => setMetodoEntrega('Local')} class={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${metodoEntrega === 'Local' ? 'bg-[#3b4c41] text-white shadow-md' : 'text-[#7a8c81] hover:bg-[#f4f8f6]'}`}>
            RETIRO EN LOCAL
          </button>
          <button onClick={() => setMetodoEntrega('Delivery')} class={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${metodoEntrega === 'Delivery' ? 'bg-[#3b4c41] text-white shadow-md' : 'text-[#7a8c81] hover:bg-[#f4f8f6]'}`}>
            ENTREGA
          </button>
        </div>
        {/* Campo de dirección dinámico */}
{metodoEntrega === 'Delivery' && (
  <div className="bg-white p-4 rounded-2xl border border-[#cbdad0] shadow-md animate-fadeIn">
    <label className="block text-xs font-black uppercase text-[#3a4a40] mb-2 tracking-widest">
      Dirección de entrega
    </label>
    <input 
      type="text" 
      placeholder="Ej: Av. Siempreviva 742" 
      value={direccion}
      onChange={(e) => setDireccion(e.target.value)}
      className="w-full p-3 border border-[#cbdad0] rounded-xl text-sm focus:border-[#b88645] focus:ring-1 focus:ring-[#b88645] outline-none transition-all"
    />
  </div>
)
}

        {/* PASO 1: PRESENTACIÓN (Potes) */}
        <div class="bg-white p-6 rounded-3xl border border-[#cbdad0] shadow-2xl space-y-5">
          <div class="px-1 space-y-1">
            <div class="flex items-center gap-3">
              <span class="h-7 w-7 rounded-full bg-[#b88645] text-white flex items-center justify-center text-sm font-black shadow-xs">1</span>
              <h2 class="text-sm font-black uppercase tracking-widest text-[#4a5a50]">Elegí tu helado o promo</h2>
            </div>
            {/* TEXTO CORREGIDO */}
            <p class="text-[13px] text-slate-600 font-medium pl-10 leading-snug">
              <strong>Armá tus potes de a uno.</strong> Seleccioná el tamaño, desliza hacia abajo para elegir los sabores y por último agregalo al carrito. Luego, si querés, podés sumar más tamaños repitiendo el mismo paso.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            {opcionesPotes.map(pote => {
              const seleccionado = poteSeleccionado?.id === pote.id
              return (
                <button 
                  key={pote.id}
                  onClick={() => { 
                    setPoteSeleccionado(pote); 
                    setGustosSeleccionados([]); 
                    setCategoriaGustoAbierta(null);
                    setCantidadPote(1); // Resetea cantidad si cambia de pote
                  }}
                  class={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-5 relative border cursor-pointer group shadow-xs ${
                    seleccionado 
                      ? 'bg-[#3b4c41] border-[#b88645] text-white shadow-md scale-[1.01] ring-2 ring-[#b88645]/40' 
                      : 'bg-[#516458] border-[#63776b] text-[#f4eee6] hover:border-[#b88645]/50 hover:bg-[#3b4c41]'
                  }`}
                >
                  <img src={fotoPotesReal} alt={pote.nombre} class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/20 shadow-2xs group-hover:scale-105 transition" />
                  <div class="flex-1 pr-12">
                    <p class={`font-black text-xs sm:text-sm uppercase tracking-wider ${seleccionado ? 'text-white' : 'text-[#f4eee6]'}`}>{pote.nombre}</p>
                    <p class={`text-[11px] sm:text-xs font-semibold mt-1 tracking-wide ${seleccionado ? 'text-amber-100/80' : 'text-[#cedad1]'}`}>{pote.detalle}</p>
                  </div>
                  <span class={`absolute bottom-4 right-4 font-black text-sm px-3 py-1.5 rounded-lg ${seleccionado ? 'bg-white/10 text-white' : 'bg-black/10 text-[#f1e7d9]'}`}>
                    ${pote.precio}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* PASO 2: SABORES */}
        {poteSeleccionado && (
          <div class="space-y-4 animate-fadeIn">
            <div class="px-1 space-y-1">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <span class="h-7 w-7 rounded-full bg-[#b88645] text-white flex items-center justify-center text-sm font-black shadow-xs">2</span>
                  <h2 class="text-sm font-black uppercase tracking-widest text-[#3a4a40]">Elegí tus gustos</h2>
                </div>
                <span class="bg-white text-[#b88645] border border-[#cbdad0] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {gustosSeleccionados.length} / {poteSeleccionado.limite}
                </span>
              </div>
              <p class="text-sm text-slate-600 font-medium pl-10 leading-snug">
                Tocá cada opción para ver los sabores y de qué están hechos.
              </p>
            </div>

            <div class="space-y-3">
              {Object.keys(listadoGustos).map(categoria => {
                const estaAbierto = categoriaGustoAbierta === categoria;
                return (
                  <div key={categoria} class="bg-white rounded-2xl border border-[#cbdad0] shadow-md overflow-hidden transition-all duration-200">
                    <button 
                      onClick={() => setCategoriaGustoAbierta(estaAbierto ? null : categoria)}
                      class="w-full p-5 text-left flex justify-between items-center transition-colors duration-200 cursor-pointer bg-white hover:bg-[#fafbfc]"
                    >
                      <span class="text-sm font-black tracking-wider text-[#3a4a40] font-sans uppercase">
                        {categoria}
                      </span>
                      <span class="text-[11px] font-black tracking-widest text-[#7a8c81] uppercase">
                        {estaAbierto ? 'CERRAR' : 'VER CATALOGO'}
                      </span>
                    </button>

                    {estaAbierto && (
                      <div class="p-4 bg-[#fbfcfb] grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#cbdad0]/40 animate-fadeIn">
                        {listadoGustos[categoria].map(gusto => {
                          const estaSeleccionado = gustosSeleccionados.includes(gusto.nombre)
                          const claseEstilo = obtenerEstiloGusto(gusto.nombre, estaSeleccionado)

                          return (
                            <div 
                              key={gusto.nombre}
                              onClick={() => seleccionarGusto(gusto.nombre)}
                              class={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 relative tracking-wide flex items-center justify-between min-h-[75px] ${claseEstilo} ${
                                estaSeleccionado ? 'scale-[1.02] shadow-md' : 'hover:border-gray-400'
                              }`}
                            >
                              <div class="flex-1 pr-4">
                                <p class="font-black text-xs sm:text-sm uppercase tracking-wide leading-tight">{gusto.nombre}</p>
                                <p class={`text-xs mt-1.5 leading-snug font-medium ${estaSeleccionado ? 'opacity-90' : 'text-slate-600'}`}>{gusto.desc}</p>
                              </div>
                              {estaSeleccionado && (
                                <span class="bg-[#b88645] text-white h-5 w-5 flex shrink-0 items-center justify-center rounded-full font-black text-xs shadow-sm">✓</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* SECCIÓN NUEVA: CONTROL DE CANTIDAD Y BOTÓN AGREGAR */}
            <div class="flex gap-3 pt-2">
              <div class="flex items-center bg-white border border-[#cbdad0] rounded-2xl overflow-hidden shadow-xs h-[60px] w-[110px] shrink-0">
                <button onClick={() => setCantidadPote(Math.max(1, cantidadPote - 1))} class="flex-1 h-full text-[#a69288] hover:bg-slate-100 font-black text-xl transition-colors cursor-pointer">-</button>
                <span class="w-8 text-center font-black text-[#3d2e27] text-lg">{cantidadPote}</span>
                <button onClick={() => setCantidadPote(cantidadPote + 1)} class="flex-1 h-full text-[#7da068] hover:bg-slate-100 font-black text-xl transition-colors cursor-pointer">+</button>
              </div>

              <button 
                onClick={agregarPoteAlCarrito}
                disabled={gustosSeleccionados.length === 0}
                class={`flex-1 font-black tracking-widest rounded-2xl shadow-xl transition-all duration-300 uppercase text-sm border ${
                  gustosSeleccionados.length > 0 
                    ? 'bg-[#b88645] text-white border-[#a67638] hover:bg-[#a67638] cursor-pointer shadow-[#b88645]/20 scale-[1.01]' 
                    : 'bg-white text-[#ccc2bc] border-[#cbdad0] cursor-not-allowed'
                }`}
              >
                AGREGAR {cantidadPote > 1 ? `${cantidadPote} POTES` : 'AL CARRITO'}
              </button>
            </div>
          </div>
        )}

        {/* SECCIÓN ADICIONAL: TORTAS Y PALETAS */}
        <div class="bg-white p-6 rounded-3xl border border-[#cbdad0] shadow-xl space-y-4">
          <div class="px-1 space-y-1">
            <div class="flex items-center gap-3">
              <span class="h-1 w-4 bg-[#516458] rounded-full"></span>
              <h3 class="text-lg font-black text-[#b88645] uppercase tracking-widest">Pastelería y Adicionales</h3>
            </div>
            <p class="text-sm text-slate-600 font-medium pl-7 leading-snug">
              Tocá cada opción para ver el detalle de nuestras tortas, paletas y extras.
            </p>
          </div>
          
          <div class="space-y-3">
            {Object.keys(catalogoExtras).map(categoria => {
              const estaAbierto = categoriaExtraAbierta === categoria;
              return (
                <div key={categoria} class="bg-[#fafbfc] rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200">
                  <button 
                    onClick={() => setCategoriaExtraAbierta(estaAbierto ? null : categoria)}
                    class="w-full p-4 text-left flex justify-between items-center transition-colors duration-200 cursor-pointer hover:bg-slate-100"
                  >
                    <span class="text-[11px] font-black tracking-wider text-[#3a4a40] uppercase">
                      {categoria}
                    </span>
                    <span class="text-[10px] font-black tracking-widest text-[#7a8c81] uppercase">
                      {estaAbierto ? '-' : '+'}
                    </span>
                  </button>

                  {estaAbierto && (
                    <div class="p-3 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 animate-fadeIn">
                      {catalogoExtras[categoria].map(extra => (
                        <div key={extra.id} class="border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 shadow-xs">
                          <div class="flex-1">
                            <p class="font-black text-xs uppercase tracking-wide text-[#3d2e27] leading-tight">{extra.nombre}</p>
                            <p class="text-[11px] text-slate-600 mt-1 font-medium leading-snug">{extra.detalle}</p>
                            <p class="text-xs font-bold text-[#516458] mt-1.5">${extra.precio}</p>
                          </div>
                          <button onClick={() => agregarExtraAlCarrito(extra)} class="h-8 w-8 shrink-0 rounded-lg bg-white border border-[#cbdad0] text-[#b88645] font-black text-lg flex items-center justify-center hover:bg-[#b88645] hover:text-white transition-all shadow-xs cursor-pointer">+</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* PASO FINAL: CARRITO Y WHATSAPP */}
        {carrito.length > 0 && (
          <div class="space-y-5 animate-fadeIn">
            <div class="flex items-center gap-3 px-1">
              <span class="h-7 w-7 rounded-full bg-[#b88645] text-white flex items-center justify-center text-sm font-black shadow-xs">✓</span>
              <h2 class="text-sm font-black uppercase tracking-widest text-[#3a4a40]">Tu Pedido</h2>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-[#cbdad0] shadow-2xl space-y-5">
              
              <div class="bg-slate-100/50 p-4 rounded-xl border border-dashed border-slate-300 text-center mb-2">
                <p class="text-xs font-black text-slate-700 uppercase tracking-widest mb-1">Pago vía Mercado Pago / Transferencia</p>
                <p class="text-[11px] font-medium text-slate-600">Alias: <span class="font-black text-slate-800">HELADOS.SMO.MP</span></p>
                <p class="text-[10px] text-slate-500 mt-1 italic">(Realizá el pago y enviá el comprobante junto con el pedido)</p>
              </div>

              <div class="space-y-3 max-h-72 overflow-y-auto pr-2">
                {carrito.map((item) => (
                  <div key={item.id} class="p-4 bg-[#fafbfc] border border-[#e2ebe6] rounded-2xl flex justify-between items-center shadow-sm">
                    <div class="flex-1 pr-3">
                      <p class="font-black text-[#3d2e27] uppercase tracking-wide text-xs">
                        {(item.cantidad || 1) > 1 ? <span class="text-[#b88645] mr-1">{item.cantidad || 1}x</span> : ''}
                        {item.nombre}
                      </p>
                      {item.gustos && item.gustos.length > 0 && (
                        <p class="text-xs text-[#8c766c] pl-3 mt-2 font-medium border-l-2 border-[#b88645]/50 leading-relaxed">{item.gustos.join(' • ')}</p>
                      )}
                    </div>
                    
                    {/* Botonera de control de cantidad en el carrito */}
                    <div class="flex flex-col items-end gap-2 ml-2">
                       <span class="font-black text-sm text-[#516458]">${item.precio * (item.cantidad || 1)}</span>
                       <div class="flex items-center bg-white border border-[#cbdad0] rounded-lg shadow-xs overflow-hidden">
                          <button onClick={() => modificarCantidad(item.id, -1)} class="w-8 h-8 bg-slate-50 hover:bg-slate-100 text-[#a69288] hover:text-red-500 font-black text-lg flex items-center justify-center transition-colors cursor-pointer">-</button>
                          <span class="w-6 text-center text-xs font-black text-[#3d2e27]">{item.cantidad || 1}</span>
                          <button onClick={() => modificarCantidad(item.id, 1)} class="w-8 h-8 bg-slate-50 hover:bg-slate-100 text-[#7da068] hover:text-[#516458] font-black text-lg flex items-center justify-center transition-colors cursor-pointer">+</button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-300 px-2">
                <span class="text-sm font-black uppercase tracking-wider text-[#4a5a50]">Total Final:</span>
                <span class="text-2xl font-black text-[#b88645] drop-shadow-sm">${calcularTotal()}</span>
              </div>
              
              <button onClick={enviarPedidoWhatsApp} class="w-full bg-[#3b4c41] text-white border border-[#b88645]/50 font-black text-sm tracking-widest uppercase p-5 rounded-2xl shadow-xl hover:bg-[#2d3a31] hover:border-[#b88645] transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer shadow-black/20 scale-[1.01]">
                ENVIAR PEDIDO Y COMPROBANTE.
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer class="bg-black/5 text-[#516458] text-xs p-8 text-center mt-24 border-t border-[#cbdad0]">
        <p class="font-bold">© 2026 Heladería S´mo. Todos los derechos reservados.</p>
        <p class="mt-2 font-light">Arquitectura de sistema & UI desarrollada por:</p>
        <a href="https://wa.me/5491154229565" target="_blank" rel="noopener noreferrer" class="inline-block mt-4 text-[#b88645] font-black bg-white hover:bg-[#fafbfa] px-5 py-2.5 rounded-xl border border-[#cbdad0] shadow-3xs transition-all duration-300 hover:scale-[1.02]">Fernando Santos | Systems Analyst</a>
      </footer>

    </div>
  );
}
