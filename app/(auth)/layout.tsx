import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>AuthLayout is special only for Auth route
            {children}
        </div>
    )
}

export default AuthLayout;