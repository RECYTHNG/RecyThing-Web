export default function Card({ image, title, onClick }) {
  return (
    <div className="flex flex-col gap-2 w-full h-[300px] rounded-2xl shadow-md cursor-pointer" onClick={onClick}>
      <div className="h-[212px] w-full overflow-hidden rounded-t-2xl">
        <img src={image} alt={title} className="h-full w-full object-cover hover:scale-110 transition-transform duration-300" />
      </div>
      <p className="body-s px-3 pt-2 font-semibold line-clamp-2">{title}</p>
    </div>
  );
}
