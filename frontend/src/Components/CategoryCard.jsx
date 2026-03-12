import { useNavigate } from "react-router-dom";

export default function CategoryCard({ title, image, console: consoleName }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productlist?console=${encodeURIComponent(consoleName || title)}`)}
      className="bg-white rounded-[16px] overflow-hidden shadow-sm cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="w-full h-[180px] bg-[#D8E3F2] flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="px-5 py-4 flex items-center justify-between">
        <h3 className="text-[#1F1F1F] font-bold text-[16px]">{title}</h3>
        <span className="text-[#2074c9] font-semibold text-[13px] group-hover:underline">
          Ver jogos →
        </span>
      </div>
    </div>
  );
}