const STATUS = {
  stable: { label: "стабильно", className: "badge-stable" },
  test: { label: "тестирование", className: "badge-test" },
  dev: { label: "разработка", className: "badge-dev" },
  plan: { label: "в планах", className: "badge-plan" },
  deprecated: { label: "устарело", className: "badge-deprecated" },
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCard(item) {
  const status = STATUS[item.status];
  if (!status) {
    throw new Error(`Неизвестный статус «${item.status}» у «${item.title}»`);
  }

  const deprecated = item.status === "deprecated";
  const cardClass = deprecated ? "card card-deprecated" : "card";
  const urls = [item.url, ...(item.aliases || [])];
  const urlLines = urls
    .map((href) => {
      const safe = escapeHtml(href);
      return `<p class="card-url"><a href="${safe}">${safe}</a></p>`;
    })
    .join("");

  return `
    <article class="${cardClass}">
      <div class="card-top">
        <h3>${escapeHtml(item.title)}</h3>
        <span class="badge ${status.className}">${status.label}</span>
      </div>
      ${urlLines}
      <p class="card-desc">${item.description}</p>
    </article>
  `;
}

function renderSection(section) {
  const muted = section.muted ? " group-muted" : "";
  const cards = section.items.map(renderCard).join("");

  return `
    <section class="group${muted}" id="${escapeHtml(section.id)}">
      <h2>${escapeHtml(section.title)}</h2>
      <div class="cards">${cards}</div>
    </section>
  `;
}

async function init() {
  const main = document.getElementById("content");

  try {
    const response = await fetch("services.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    main.innerHTML = data.sections.map(renderSection).join("");
  } catch (error) {
    main.innerHTML = `
      <p class="load-error">
        Не удалось загрузить список сервисов.
        Проверьте файл <code>services.json</code>.
      </p>
    `;
    console.error(error);
  }
}

init();
