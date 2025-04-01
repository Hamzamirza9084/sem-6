import './Btn.css';

export const Btn = ({ onClick, isChecked }) => {
    return (
        <label htmlFor="theme" className="theme">
            <span className="theme__toggle-wrap">
                <input 
                    id="theme" 
                    className="theme__toggle" 
                    type="checkbox" 
                    role="switch"  
                    name="theme" 
                    checked={isChecked} // Make sure checkbox is in sync with theme
                    onChange={onClick}  // Handle theme toggle
                />
                <span className="theme__fill"></span>
                <span className="theme__icon">
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                    <span className="theme__icon-part"></span>
                </span>
            </span>
        </label>
    );
}


