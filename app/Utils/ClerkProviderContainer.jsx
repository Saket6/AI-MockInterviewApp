
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
export default function ClerkContainer({ children, }) {
    return (
        <ClerkProvider>
         
            {children}
        </ClerkProvider>
    )
}