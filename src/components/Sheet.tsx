import { X } from "lucide-react"
import { useEffect } from "react"

interface SheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode

  customMinHeight?: string
}
interface SheetHeaderProps {
  label: string
  onClose?: () => void
}
interface SheetContentProps {
  children: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children, customMinHeight }) => {
  // disable scroll when isOpen is true
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="relative">
      <input
        id="sheet-input"
        type="checkbox"
        className="hidden"
        checked={isOpen}
        onChange={() => onClose()}
      />
      {/* <div className="drawer-content">
        <label for="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
      </div> */}

      <div className={`
        fixed inset-0 z-50
        transition-opacity duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        mt-auto
      `}>
        <label
          htmlFor="sheet-input"
          aria-label="close sidebar"
          className="w-full h-full absolute top-0 left-0 bg-black/20"
        ></label>
        <div className={`
          bg-[rgb(248,250,255)] min-h-[${customMinHeight || '200px'}] max-h-[80vh] p-4
          absolute bottom-0 border-t border-gray-300 rounded-t-[15px] w-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {children}
        </div>
      </div>


    </div>
  )
}

const SheetHeader: React.FC<SheetHeaderProps> = ({ label, onClose }) => {
  return <div className="flex justify-center items-center relative mb-4">
    <h2 className="text-lg font-bold">{label}</h2>
    {onClose && (
      // <button
      //   className="btn btn-sm btn-circle btn-ghost absolute right-0"
      //   onClick={onClose}
      // >
      //   <X className="w-5 h-5" />
      // </button>

      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-0 outline-none border-none"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
}
const SheetContent: React.FC<SheetContentProps> = ({ children }) => {
  return <div className="mb-4">
    {children}
  </div>
}

export default Sheet;
export { SheetHeader, SheetContent };
