function loadFragment(selector, url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Failed to load " + url);
            }
            return response.text();
        })
        .then(function(html) {
            var element = document.querySelector(selector);
            if (element) {
                element.innerHTML = html;
            }
        });
}

function loadCertificateModal(path) {
    var container = document.createElement("div");
    document.getElementById("certificateModals").appendChild(container);

    return fetch("html/certificates/" + path + ".html")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Failed to load modal " + path);
            }
            return response.text();
        })
        .then(function(html) {
            container.innerHTML = html;
        });
}

$(function() {
    loadFragment("#contentAbout", "html/about.html");
    loadFragment("#contentHistory", "html/history.html");
    loadFragment("#contentMe", "html/me.html");
    loadFragment("#contentFooter", "html/footer.html");
    loadFragment("#contentCertificados", "html/certificados.html");

    var certificateModals = [
        "education/degree",
        "certificates/aws-cloud-practitioner",
        "certificates/scrum-fundamentals",
        "soft-skills/leadership",
        "soft-skills/scrum",
        "data-science/ai-engineer",
        "data-science/machine-learning",
        "backend-cloud/backend",
        "backend-cloud/cloud",
        "backend-cloud/data-management",
        "mobile/android",
        "mobile/ios",
        "mobile/architecture"
    ];

    certificateModals.forEach(function(path) {
        loadCertificateModal(path);
    });
});
