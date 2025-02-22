import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-pink-400 text-white py-10 px-6 md:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                
                {/* Nombre y descripción */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold">Pastelitos 🍰</h2>
                    <p className="text-sm mt-2">Endulzando tu vida con los mejores pasteles.</p>
                </div>

                {/* Links de navegación */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                    <a href="#" className="hover:underline">Inicio</a>
                    <a href="#" className="hover:underline">Sobre Nosotros</a>
                    <a href="#" className="hover:underline">Menú</a>
                    <a href="#" className="hover:underline">Contacto</a>
                </div>

                {/* Redes sociales */}
                <div className="flex space-x-4 mt-6 md:mt-0">
                    <a href="#" className="text-2xl hover:text-pink-100"><FaFacebook /></a>
                    <a href="#" className="text-2xl hover:text-pink-100"><FaInstagram /></a>
                    <a href="#" className="text-2xl hover:text-pink-100"><FaTwitter /></a>
                    <a href="#" className="text-2xl hover:text-pink-100"><FaTiktok /></a>
                </div>
            </div>

            {/* Derechos y términos */}
            <div className="mt-8 text-center text-sm border-t border-white/30 pt-4">
                <p>© {new Date().getFullYear()} Pastelitos. Todos los derechos reservados.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:underline">Términos y condiciones</a>
                    <a href="#" className="hover:underline">Política de privacidad</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
