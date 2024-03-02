import { ArrowRight } from 'lucide-react'

export default function SubmitBTN({ text ,onClick}) {
  
    return(<div>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        >
          {text} <ArrowRight className="ml-2" size={16} />
        </button>
      </div>)
}