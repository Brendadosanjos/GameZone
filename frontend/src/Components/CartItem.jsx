export default function CartItem({ product, onRemove }) {
  return (
    <div className="flex items-center gap-5 bg-white rounded-[16px] p-4 shadow-sm">

      <div className="w-[90px] h-[90px] rounded-[10px] bg-[#F5F5F5] flex items-center justify-center shrink-0 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        {product.console && (
          <span className="text-[#2074c9] text-[11px] font-bold uppercase tracking-wide">
            {product.console}
          </span>
        )}
        <h4 className="text-[#1F1F1F] font-bold text-[15px] leading-snug mt-1 truncate">
          {product.title}
        </h4>
        <p className="text-[#8F8F8F] text-[12px] mt-1">{product.category}</p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-[#2074c9] font-extrabold text-[18px]">
          R$ {Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="text-[#FF4D4F] hover:text-[#d9363e] font-bold text-[13px] transition-colors duration-150 shrink-0"
      >
        Remover
      </button>

    </div>
  );
}