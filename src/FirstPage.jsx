import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const images = [
    {
        src: "/pastel1.jpg",
        title: "Pastel Primavera",
        description: "Un pastel delicioso para la temporada de primavera.",
        price: "S/.12.99",
    },
    {
        src: "/pastel2.jpg",
        title: "Pastel de Chocolate",
        description: "Pastel relleno de chocolate con cobertura de crema.",
        price: "S/.15.99",
    },
    {
        src: "/pastel3.jpg",
        title: "Pastel de Fresa",
        description: "Pastel suave con fresas frescas y crema batida.",
        price: "S/.14.99",
    },
];

const articulos = [
    {
        src: "/pastel1.jpg",
        title: "Pastel Primavera",
        description: "Un pastel delicioso para la temporada de primavera.",
        price: "S/.12.99",
        gridPosition: "col-start-1 col-end-3"
    },
    {
        src: "/pastel2.jpg",
        title: "Pastel de Chocolate",
        description: "Pastel relleno de chocolate con cobertura de crema.",
        price: "S/.15.99",
        gridPosition: "col-start-3 col-end-5"
    },
    {
        src: "/pastel3.jpg",
        title: "Pastel de Fresa",
        description: "Pastel suave con fresas frescas y crema batida.",
        price: "S/.14.99",
        gridPosition: "col-start-5 col-end-7"
    },
    {
        src: "/pastel2.jpg",
        title: "Pastel de Vainilla",
        description: "Un clásico pastel de vainilla con un toque especial.",
        price: "S/.13.99",
        gridPosition: "col-start-2 col-end-4"
    },
    {
        src: "/pastel1.jpg",
        title: "Pastel de Caramelo",
        description: "Delicioso pastel con caramelo derretido.",
        price: "S/.16.99",
        gridPosition: "col-start-4 col-end-6"
    },
    {
        src: "/pastel2.jpg",
        title: "Pastel de Limón",
        description: "Pastel con un refrescante toque de limón.",
        price: "S/.14.49",
        gridPosition: "col-start-1 col-end-3"
    },
    {
        src: "/pastel3.jpg",
        title: "Pastel Red Velvet",
        description: "Un pastel clásico con un sabor único.",
        price: "S/.17.99",
        gridPosition: "col-start-3 col-end-5"
    },
    {
        src: "/pastel1.jpg",
        title: "Pastel de Mora",
        description: "Pastel con una exquisita mezcla de moras frescas.",
        price: "S/.15.49",
        gridPosition: "col-start-5 col-end-7"
    }
];

const FirstPage = () => {
    const [frontIndex, setFrontIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const itemRefs = useRef([]);

    // Función para actualizar el índice de la imagen al frente
    const bringToFront = (index) => {
        setFrontIndex(index);
    };

    // Desplazamientos relativos desde el centro
    const offsets = [
        { x: 0, y: 50 },  // Más a la izquierda y arriba
        { x: 75, y: 0 },  // Centro
        { x: 150, y: -50 }, // Más a la derecha y abajo
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set(prev).add(entry.target.dataset.index));
                    }
                });
            },
            { threshold: 0.3 } // Se activa cuando el 30% del elemento es visible
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="flex flex-row bg-cover bg-center bg-pink-300">
                {/* Sección de título */}
                <motion.div
                    className="basis-1/4 flex items-center justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <motion.h1
                        className="text-4xl font-extrabold text-gray-800"
                        style={{
                            writingMode: "vertical-rl",
                            textOrientation: "upright"
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        PASTELITOS
                    </motion.h1>
                </motion.div>



                {/* Sección de imágenes */}
                <div className="basis-3/4">
                    <div className="p-4 flex flex-col">
                        {/* Título de la sección */}
                        <div className="text-3xl text-gray-800 font-bold mb-6 text-center">
                            Pasteles más vendidos
                        </div>
                        {/* Contenedor de imágenes */}
                        <div className="m-10 grid place-content-center h-[60vh]">
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="ml-25 absolute bg-gray-200 aspect-3/2 h-[60vh] w-[45vw] bg-cover bg-center rounded-lg shadow-lg"
                                    style={{
                                        backgroundImage: `url(${image.src})`,
                                        zIndex: frontIndex === index ? 10 : 5, // Imágenes al frente tienen zIndex mayor
                                    }}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        x: 100, // Separación inicial
                                    }}
                                    animate={{
                                        opacity: frontIndex === index ? 1 : 0.5, // Opacidad dinámica
                                        scale: frontIndex === index ? 1.05 : 1,
                                        x: offsets[index].x, // Desplazamiento relativo
                                        y: offsets[index].y,
                                    }}
                                    transition={{
                                        duration: 1 + index * 0.2, // Variar la duración según el índice
                                        ease: "easeInOut",
                                    }}
                                >
                                    {/* Imagen */}
                                    <div className="w-full border-2 border-pink-500 h-full bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image.src})` }}>

                                        {/* Contenedor de Título, Descripción y Precio dentro de la imagen */}
                                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 to-black/20 p-4 text-white">
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-semibold">{image.title}</h3>
                                                <p className="text-sm">{image.description}</p>
                                            </div>
                                            <div className="text-2xl font-bold">{image.price}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Botones para cambiar el z-index */}
                        <div className="mt-8 flex justify-center gap-4">
                            {images.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => bringToFront(index)}
                                    className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-700 transition"
                                    animate={{
                                        opacity: frontIndex === index ? 1 : 0.9, // Opacidad dinámica para los botones
                                    }}
                                    transition={{
                                        duration: 0.3, // Transición suave
                                        ease: "easeInOut",
                                    }}
                                >
                                    {index + 1}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-pink-300 py-16 px-8 flex flex-col items-center text-center">
                <motion.h2
                    className="text-6xl font-bold text-gray-800 mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Sobre Nosotros
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-700 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    En <span className="font-bold text-red-500">Pastelitos</span>, nos dedicamos a crear los más deliciosos y hermosos pasteles
                    para cualquier ocasión. Con ingredientes de alta calidad y un toque especial,
                    convertimos cada pastel en una obra de arte que deleita tanto a la vista como al paladar.
                </motion.p>

                <motion.div
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className="bg-white shadow-xl p-6 rounded-lg text-gray-800">
                        <h3 className="text-xl font-semibold mb-2">🎂 Calidad Inigualable</h3>
                        <p className="text-sm">Usamos solo ingredientes frescos y seleccionados para garantizar el mejor sabor.</p>
                    </div>
                    <div className="bg-white shadow-xl p-6 rounded-lg text-gray-800">
                        <h3 className="text-xl font-semibold mb-2">💖 Pasión y Creatividad</h3>
                        <p className="text-sm">Cada pastel es hecho con amor y creatividad para que sea único y especial.</p>
                    </div>
                    <div className="bg-white shadow-xl p-6 rounded-lg text-gray-800">
                        <h3 className="text-xl font-semibold mb-2">🚚 Entrega a Tiempo</h3>
                        <p className="text-sm">Nos aseguramos de que tu pastel llegue en perfectas condiciones y a tiempo.</p>
                    </div>
                </motion.div>
            </div>
            <div className="bg-pink-300 p-8">
                <h1 className="text-6xl font-bold text-center text-gray-800 mb-2">Pasteles a la Venta</h1>
                <div className="grid grid-cols-6 gap-6">
                    {articulos.map((articulo, index) => (
                        <motion.div
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            data-index={index}
                            className={`mx-4 my-2 p-3 shadow-2xl rounded-lg ${articulo.gridPosition}`}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={visibleItems.has(index.toString()) ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <img src={articulo.src} alt={articulo.title} className="w-full h-64 object-cover rounded-md" />
                            <h2 className="text-md font-bold mt-2 text-gray-800">{articulo.title}</h2>
                            <p className="text-xs text-gray-600 mb-1">{articulo.description}</p>
                            <p className="text-md font-semibold text-red-500">{articulo.price}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FirstPage;