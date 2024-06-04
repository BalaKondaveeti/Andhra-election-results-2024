interface DropDownProps {
    label: string; 
    options: string[]
    selectedOption: string; 
    setSelectedOption: (sabha: string) => void; 
}


function DropDownWidget({ label, selectedOption, setSelectedOption, options }: DropDownProps) {
    return (
        <div className='dropdown-container'>
            <div className='dropdown-label'>{label}</div>
            <div className='dropdown'>
                <div className='dropdown-button'>
                    <div>{selectedOption}</div>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="dropdown-content">
                    {
                        options.map((option) => (
                            <div className="dropdown-item" onClick={(_) => setSelectedOption(option)}>
                                {option}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DropDownWidget;
