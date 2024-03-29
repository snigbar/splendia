const Header = () => {
  return (
    <div className="bg-header bg-cover bg-center py-24 rounded-2xl my-4">
      <div className="container mx-auto flex flex-col items-center justify-between gap-5">
        <h1 className="text-white font-bold text-3xl lg:text-5xl text-center">
          Book Your Stay With Splendia
        </h1>
        <p className="text-white lg:text-xl font-medium text-center">
          18,450,49 rooms around the world waiting for you!
        </p>
      </div>
    </div>
  );
};

export default Header;
