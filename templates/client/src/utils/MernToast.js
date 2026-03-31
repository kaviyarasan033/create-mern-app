import '../assets/styles/MernToast.css';

export default function MernToast(message, type = "success", duration = 3000) {

    if (type === "200" || type === 200 || type === "success" || type === true) {
        type = "success";
    } else {
        type = "error";
    }

    let container = document.getElementById("toastContainer");

    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "mern-toast " + type;

    let iconSVG = "";

    if (type === "success") {
        iconSVG = `
        <svg width="22" height="22" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#198754"></circle>
            <path d="M7 12.5L10.2 15.5L17 8.5"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"/>
        </svg>`;
    } else {
        iconSVG = `
        <svg width="22" height="22" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#dc3545"></circle>
            <path d="M8 8L16 16M16 8L8 16"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                fill="none"/>
        </svg>`;
    }

    toast.innerHTML = `
        <div class="mern-toast-icon">${iconSVG}</div>
        <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");

        setTimeout(() => {
            toast.remove();
        }, 500); 

    }, duration);
}
