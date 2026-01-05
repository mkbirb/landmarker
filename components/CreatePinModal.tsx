import { createPin } from "@/actions/createPin";
import Modal from "react-modal";


interface PinModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    userId: string;
    onSubmit: (formData: FormData) => Promise<void>;
}

export default function CreatePinModal({isOpen, setIsOpen, userId, onSubmit} : PinModalProps) {
    const handleAction = async (formData: FormData) => {
        setIsOpen(false); 
        await onSubmit(formData); 
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center"
            className="bg-white p-6 rounded-lg outline-none"
        >
            <h2 className="text-xl font-bold mb-4">Create a New Landmarker</h2>
            <form action={handleAction}>
                <div className="space-y-2">
                    <input name="name" placeholder="Title" className="w-full border p-2 rounded" required />
                    <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
                    <select name="categoryId" className="w-full border p-2 rounded" required>
                        <option value="">Select Category</option>
                        <option value="1">🌲Nature</option>
                        <option value="2">🏛️Historical</option>
                        <option value="3">🎭Cultural</option>
                    </select>
                    <input type="hidden" name="userId" value={`${userId}`} />
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Attach Media
                    </label>
                    <input 
                        type="file" 
                        name="media" 
                        accept="image/*" 
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded"> Cancel </button>
                        <button type="submit" className="px-4 py-2 bg-green-200 rounded"> Save </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}