const alertStyles = {
    success: {
        bgColor: '#27ae60',
        icon: '✓',
        textColor: '#fff'
    },
    error: {
        bgColor: '#e74c3c',
        icon: '✕',
        textColor: '#fff'
    },
    warning: {
        bgColor: '#f39c12',
        icon: '⚠',
        textColor: '#fff'
    },
    info: {
        bgColor: '#3498db',
        icon: 'ℹ',
        textColor: '#fff'
    }
};

function showAlert(message, type = 'info', duration = 3000) {
    const style = alertStyles[type] || alertStyles.info;

    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';
    alertContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${style.bgColor};
        color: ${style.textColor};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    const icon = document.createElement('span');
    icon.textContent = style.icon;
    icon.style.cssText = `
        font-size: 1.3rem;
        font-weight: bold;
        flex-shrink: 0;
    `;

    const text = document.createElement('span');
    text.textContent = message;
    text.style.cssText = `
        flex: 1;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: ${style.textColor};
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
    closeBtn.onclick = () => removeAlert(alertContainer);

    alertContainer.appendChild(icon);
    alertContainer.appendChild(text);
    alertContainer.appendChild(closeBtn);

    document.body.appendChild(alertContainer);

    if (duration > 0) {
        setTimeout(() => removeAlert(alertContainer), duration);
    }

    return alertContainer;
}

function removeAlert(alertElement) {
    alertElement.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => alertElement.remove(), 300);
}

function alertSuccess(message, duration = 3000) {
    return showAlert(message, 'success', duration);
}

function alertError(message, duration = 4000) {
    return showAlert(message, 'error', duration);
}

function alertWarning(message, duration = 3500) {
    return showAlert(message, 'warning', duration);
}

function alertInfo(message, duration = 3000) {
    return showAlert(message, 'info', duration);
}

function alertConfirm(message, onConfirm, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'alert-modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    const modal_box = document.createElement('div');
    modal_box.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        max-width: 400px;
        text-align: center;
        animation: popIn 0.3s ease-out;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Confirm Action';
    title.style.cssText = `
        color: #2c3e50;
        margin-bottom: 16px;
        font-size: 1.3rem;
    `;

    const text = document.createElement('p');
    text.textContent = message;
    text.style.cssText = `
        color: #555;
        margin-bottom: 24px;
        line-height: 1.6;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
        justify-content: center;
    `;

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.style.cssText = `
        padding: 10px 24px;
        background-color: #27ae60;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: background-color 0.3s;
    `;
    confirmBtn.onmouseover = () => confirmBtn.style.backgroundColor = '#229954';
    confirmBtn.onmouseout = () => confirmBtn.style.backgroundColor = '#27ae60';
    confirmBtn.onclick = () => {
        modal.remove();
        if (onConfirm) onConfirm();
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 10px 24px;
        background-color: #95a5a6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: background-color 0.3s;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.backgroundColor = '#7f8c8d';
    cancelBtn.onmouseout = () => cancelBtn.style.backgroundColor = '#95a5a6';
    cancelBtn.onclick = () => {
        modal.remove();
        if (onCancel) onCancel();
    };

    buttonContainer.appendChild(confirmBtn);
    buttonContainer.appendChild(cancelBtn);

    modal_box.appendChild(title);
    modal_box.appendChild(text);
    modal_box.appendChild(buttonContainer);

    modal.appendChild(modal_box);
    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onCancel) onCancel();
        }
    };
}

function alertPrompt(message, defaultValue = '', onSubmit, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'alert-modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    const modal_box = document.createElement('div');
    modal_box.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        max-width: 400px;
        animation: popIn 0.3s ease-out;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Enter Value';
    title.style.cssText = `
        color: #2c3e50;
        margin-bottom: 16px;
        font-size: 1.3rem;
    `;

    const text = document.createElement('p');
    text.textContent = message;
    text.style.cssText = `
        color: #555;
        margin-bottom: 16px;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = defaultValue;
    input.style.cssText = `
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        margin-bottom: 20px;
        box-sizing: border-box;
    `;
    input.focus();

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    `;

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.style.cssText = `
        padding: 10px 24px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    `;
    submitBtn.onmouseover = () => submitBtn.style.backgroundColor = '#2980b9';
    submitBtn.onmouseout = () => submitBtn.style.backgroundColor = '#3498db';
    submitBtn.onclick = () => {
        modal.remove();
        if (onSubmit) onSubmit(input.value);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 10px 24px;
        background-color: #95a5a6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.backgroundColor = '#7f8c8d';
    cancelBtn.onmouseout = () => cancelBtn.style.backgroundColor = '#95a5a6';
    cancelBtn.onclick = () => {
        modal.remove();
        if (onCancel) onCancel();
    };

    buttonContainer.appendChild(submitBtn);
    buttonContainer.appendChild(cancelBtn);

    modal_box.appendChild(title);
    modal_box.appendChild(text);
    modal_box.appendChild(input);
    modal_box.appendChild(buttonContainer);

    modal.appendChild(modal_box);
    document.body.appendChild(modal);

    input.onkeypress = (e) => {
        if (e.key === 'Enter') submitBtn.click();
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onCancel) onCancel();
        }
    };
}

function addAlertStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @keyframes popIn {
            from {
                transform: scale(0.9);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

addAlertStyles();
