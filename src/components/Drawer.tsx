import React from "react";

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer: React.FC<Props> = ({ children, isOpen, setIsOpen }) => {
  return (
    <main
      className={
        "overflow-hidden h-screen z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out absolute -top-5 -right-5 -left-5 " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0"
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen  max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6  h-full bg-blue-dark p-5 pr-10">
          <span
            className="material-icons self-end text-white"
            onClick={() => setIsOpen(false)}
          >
            close
          </span>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => setIsOpen(false)}
      ></section>
    </main>
  );
};

export default Drawer;
