import React, { useRef } from "react";
import xIcon from "../../../svg/x.svg";
import Image from "next/image";
import trash from "../../../svg/trash.svg";

const Modal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const showTableList = [
    {
      id: 1,
      name: "Programming",
      action: "delete",
    },
    {
      id: 2,
      name: "java",
      action: "delete",
    },
    {
      id: 3,
      name: "c++",
      action: "delete",
    },
  ];
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className=" bg-gray-500 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center z-20"
    >
      <div className="w-10/12 h-10/12 mx-4  max-w-lg bg-white flex flex-col rounded-xl p-3">
        <Image
          onClick={() => setShowModal(false)}
          className="place-self-start sm:place-self-end hover:bg-[#b4d8da] bg-gray-300  rounded-full h-10 w-10 p-1 active:bg-red-500"
          src={xIcon}
          alt="cancel-icon"
        />
        <div className="w-full my-2   ">
          <label className="flex flex-col text-black font-bold text-lg mb-3 xl:text-2xl xl:my-2">
            Title
          </label>
          <input
            className="outline outline-1 outline-gray-300 rounded-md p-4   placeholder:text-lg placeholder:text-black placeholder:opacity-50 text-gray-700 font-medium w-full focus:ring-4 focus:ring-blue-200 focus:outline-1 focus:outline-blue-300   "
            type="text"
            placeholder="Enter Title"
          />
          <p></p>
        </div>
        <button
          className="  w-2/6  mx-auto    py-2 rounded-xl   font-bold text-md    sm:align-baseline 
        
        btn group relative inline-flex items-center justify-start overflow-hidden  bg-gray-300    transition-all hover:bg-white
        "
        >
          <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-56 translate-x-full translate-y-full rounded bg-black transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
          <span className="relative w-full text-center  text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            add Now
          </span>
        </button>
        <h1 className="font-light text-xl my-6 text-black mx-2">
          All Categories
        </h1>
        <table className="text-center text-black mx-4 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showTableList.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>
                    {" "}
                    <Image className="  mx-auto" src={trash} alt={row.action} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
