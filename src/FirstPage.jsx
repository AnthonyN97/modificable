import { useState } from "react";
import { motion } from "motion/react";

const images = [
    {
        src: "/pastel1.jpg",
        title: "Pastel Primavera",
        description: "Un pastel delicioso para la temporada de primavera.",
        price: "$12.99",
    },
    {
        src: "/pastel2.jpg",
        title: "Pastel de Chocolate",
        description: "Pastel relleno de chocolate con cobertura de crema.",
        price: "$15.99",
    },
    {
        src: "/pastel3.jpg",
        title: "Pastel de Fresa",
        description: "Pastel suave con fresas frescas y crema batida.",
        price: "$14.99",
    },
];

const FirstPage = () => {
    const [frontIndex, setFrontIndex] = useState(0);

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

    return (
        <>
            <div className="flex flex-row h-screen">
                {/* Sección de título */}
                <div className="basis-1/4 flex items-center justify-center bg-gray-100 shadow-lg">
                    <h1 className="text-2xl font-bold">Título</h1>
                </div>

                {/* Sección de imágenes */}
                <div className="basis-3/4">
                    <div className="p-4 flex flex-col">
                        {/* Título de la sección */}
                        <div className="text-3xl font-semibold mb-6 text-center">
                            Artículos más vendidos
                        </div>
                        {/* Contenedor de imágenes */}
                        <div className="m-10 grid place-content-center relative w-full h-[60vh]">
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
                                    <div className="w-full h-full bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image.src})` }}>

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
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
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
        </>
    );
};

export default FirstPage;