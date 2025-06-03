const footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} 2scontrol. Todos os direitos reservados.
        </p>
        <p className="text-xs mt-2">
          Contato: <a href="mailto:marcos.brambilla2003@gmail.com" className="text-blue-400 hover:underline">marcos.brambilla2003@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
export default footer;