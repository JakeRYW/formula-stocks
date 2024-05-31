import { LoginForm } from './login-form';

interface LoginModalProps {
	setShowLoginModal: Function;
}

export function LoginModal({ setShowLoginModal }: LoginModalProps) {
	return (
		<>
			<div
				className='bg-black/30 absolute w-screen h-screen z-50 flex items-center justify-center'
				onClick={() => {
					setShowLoginModal(false);
				}}
			>
				<LoginForm />
			</div>
		</>
	);
}
