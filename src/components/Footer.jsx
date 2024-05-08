import React from 'react'

function Footer() {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="social_icons">
                        <img src="/src/assets/instagram.png"/>
                        <img src="/src/assets/facebook.png"/>
                        <img src="/src/assets/linkedin.png"/>
                        <img src="/src/assets/youtube.png"/>
                    </div>
                    <div className="f-brand"> &copy; Wonderlust Private Limited</div>
                    <div className="f-links">
                        <a href="/privacy">Privacy</a>
                        <a href="/Terms">Terms</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer