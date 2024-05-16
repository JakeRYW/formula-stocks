import { RxExclamationTriangle } from 'react-icons/rx';

interface FormErrorProps {
	message?: string;
	className?: string;
}

export const FormError = ({ className, message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div
			className={`bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive justify-center ${className}`}
		>
			<RxExclamationTriangle size={18} />
			<p>{message}</p>
		</div>
	);
};
