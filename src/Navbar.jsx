import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const goToCartPage = () => {
      navigate("/cart"); // Navigate to the CartPage when cart button is clicked
    };
  return (
    <nav className="md:h-[10vh] h-[40vh] w-screen md:w-[95vw]  mx-auto flex justify-evenly md:justify-center items-center  flex-col md:flex-row">
      <div className="h-[27vh] w-screen flex items-center justify-center flex-col md:flex-row md:h-full md:w-[25%]  md:justify-start ">
        <img src="../public/Logo.png" className="h-[200px] w-[200px] md:h-[150px] md:w-[150px] "></img>
        <h1 className="text-4xl">Krazy Dine</h1>
      </div>
      <div className="h-[10vh]  md:h-full w-screen md:w-[55%] flex items-center justify-center md:justify-center gap-2 ">
        <img className="h-[27px] w-[27px]" src="../public/Search.svg" alt="" />
        <input type="text" placeholder="Search for food" className="mx-2 px-2 rounded-4xl border border-b-neutral-900 h-[65%] w-[80vw] md:w-[80%]"></input>
        <div className="h-[40px] w-[40px] bg-amber-900 rounded-[50%] mx-2"></div>
        <button onClick={goToCartPage} className="h-[40px] w-[40px] rounded-[50%] mx-2">
          <img className="object-fill" src="../public/cart.svg" alt="" />
        </button>
      </div>
      <div className="h-[5vh] md:h-full w-screen md:w-[20%] flex space-x-4 justify-center items-center md:justify-evenly text-2xl flex-row ">
        <a href="">Home</a>
        <a href="">Services</a>
        <a href="">About</a>
      </div>
    </nav>
  );
}
export default Navbar;