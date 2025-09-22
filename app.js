document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // --- SELECTORES ---
  const loginForm = document.querySelector("#loginForm");
  const loginContenedor = document.querySelector("#login-form-container");
  const home = document.querySelector(".home");
  const links = document.querySelectorAll(".sidebar a");
  const sections = document.querySelectorAll(".section");
  const navbar = document.querySelector("#navbar");
  const userName = document.querySelector("#username");
  const userPassword = document.querySelector("#password");
  const ctx = document.getElementById("myChart").getContext("2d");

  const usuarioLogin = "doctor";
  const contrasenia = "1234";

  // --- FORMULARIO PACIENTE ---
  const formulario = document.querySelector(".formulario");

  const nombre = document.querySelector("#nombre");
  const telefono = document.querySelector("#telefono");
  const email = document.querySelector("#email");
  const edad = document.querySelector("#year");
  const genero = document.querySelector("#genero");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const observaciones = document.querySelector("#observaciones");
  const diabetesCheckbox = document.querySelector("#diabetes");
  const hipertensionCheckbox = document.querySelector("#hipertension");

  const paciente = {
    nombre: "",
    telefono: "",
    email: "",
    edad: "",
    genero: "",
    peso: "",
    altura: "",
    observaciones: "",
    diabetes: false,
    hipertension: false,
  };

  // --- LOGIN ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userName.value.trim() === "" || userPassword.value.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "error", loginForm);
      return;
    }

    if (userName.value === usuarioLogin && userPassword.value === contrasenia) {
      loginContenedor.classList.add("hidden");
      home.style.display = "flex";
    } else {
      mostrarAlerta("Usuario o contraseña incorrecta", "error", loginForm);
    }
  });

  // --- VALIDACION INPUTS ---
  const inputs = [
    nombre,
    telefono,
    email,
    edad,
    genero,
    peso,
    altura,
    observaciones,
  ];
  inputs.forEach((input) => {
    input.addEventListener("blur", (e) => {
      paciente[e.target.name] = e.target.value.trim();
      console.log(paciente);
    });
  });

  // --- ENVIO FORMULARIO PACIENTE ---
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // actualizar checkboxes
    paciente.diabetes = diabetesCheckbox.checked;
    paciente.hipertension = hipertensionCheckbox.checked;

    // validar campos obligatorios
    if (!paciente.nombre || !paciente.telefono || !paciente.email) {
      mostrarAlerta(
        "Debes llenar Nombre, Teléfono y Email",
        "error",
        formulario
      );
      return;
    }

    console.log("Paciente guardado:", paciente);
    mostrarAlerta("Paciente registrado correctamente", "success", formulario);

    // opcional: limpiar formulario
    formulario.reset();
  });

  // --- FUNCION DE ALERTA ---
  function mostrarAlerta(mensaje, tipo, padre) {
    const alertExistente = padre.querySelector(".alerta");
    if (!alertExistente) {
      const alert = document.createElement("div");
      alert.classList.add("alerta", tipo === "error" ? "error" : "bg-green");
      alert.textContent = mensaje;
      padre.appendChild(alert);
      setTimeout(() => {
        alert.style.animation = "fadeOut 0.3s forwards";
        setTimeout(() => alert.remove(), 300);
      }, 3000);
    }
  }

  // --- SIDEBAR / MENU HAMBURGUESA ---
  navbar.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const activo = document.querySelector(".sidebar-activo");

    if (activo) {
      sidebar.classList.remove("sidebar-activo");
      sidebar.classList.add("sidebar-desactivado");
    } else {
      sidebar.classList.add("sidebar-activo");
      sidebar.classList.remove("sidebar-desactivado");
    }
  });

  // --- NAVEGACION POR SECCIONES ---
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("selected"));
      link.classList.add("selected");

      const targetId = link.getAttribute("href").substring(1);
      sections.forEach((section) => {
        section.id === targetId
          ? section.classList.remove("hidden")
          : section.classList.add("hidden");
      });
    });
  });

  // --- CHART.JS ---
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      datasets: [
        {
          label: "Citas por día",
          data: [12, 19, 3, 5, 2],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true } },
    },
  });
});
