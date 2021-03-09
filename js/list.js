const list = {};
list.classes = [];
list.classeToRemove = null;
list.init = async () => {
    list.classes = await list.getClasses();
    list.sansDoublon = await list.noDuplicate();
    list.fillSelectedIdUtilisateur(list.sansDoublon);
    list.fillSelectedNomClasse(list.classes);
    list.fillSelectedSexe(list.classes);
    list.importClassesInTable(list.classes, true);
};

list.fillSelectedIdUtilisateur = (users) => {
    const select = jQuery("#id_utilisateur");
    select.find('option').remove().end().append(
        users.map((users) => {
            return `<option value=${users.id}>${users.pseudo}</option>`;
        })
    );
};

list.fillSelectedNomClasse = () => {
    const select = jQuery("#nom_classe");

    select.find('option').remove().end().append(
        `<option value"Archer"> Archer </option>`,
        `<option value"Assassin"> Assassin </option>`,
        `<option value"Berseker"> Berseker </option>`,
        `<option value"Chevalier"> Chevalier </option>`,
        `<option value"Soigneur"> Soigneur </option>`
    );
};

list.fillSelectedSexe = () => {
    const select = jQuery("#sexe");
    select.find('option').remove().end().append(
        `<option value="M"> M </option>`,
        `<option value="F"> F </option>`
    );
};

list.getClasses = () => {
    return jQuery.ajax({
        url: "https://projet-api.herokuapp.com/index/classes",
        method: "GET",

    }).catch((error) => {
        console.warn(error);
        return [];
    });
};

list.noDuplicate = () => {
    return jQuery.ajax({
        url: "https://projet-api.herokuapp.com/index/utilisateurs/noDuplicate",
        method: "GET",

    }).catch((error) => {
        console.warn(error);
        return [];
    });
};

list.confirmRemove = (classeId) => {
    list.classeToRemove = classeId;
    jQuery("#remove-line-modal").modal("toggle");
};

list.remove = async () => {
    const classeId = list.classeToRemove;
    try {
        await jQuery.ajax({
            url: `https://projet-api.herokuapp.com/index/classe/${classeId}`,
            method: "DELETE",
        });
        jQuery(`[data-id="${classeId}"]`).fadeOut('slow');

    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue impossible de supprimer la classe.');
    } finally {
        jQuery("#remove-line-modal").modal('hide');
    }
};

list.importClassesInTable = (classes, clear) => {
    const tbody = jQuery("#list-classes tbody");
    if (clear === true) {
        tbody.empty();
    }
    tbody.append(
        classes.map((classe) => {
            return `
            <tr data-id="${classe.id}">
                <td> ${classe.id_utilisateur} </td>
                <td> ${classe.nom} </td>
                <td> ${classe.prenom} </td>
                <td> ${classe.age} </td>
                <td> ${classe.id} </td>
                <td> ${classe.nom_classe} </td>
                <td> ${classe.pseudo} </td>
                <td> ${classe.niveau} </td>
                <td> ${classe.sexe} </td>
                <td> 
                   <button onclick="list.confirmRemove(${classe.id})" class="btn btn-danger remove-line"> Supprimer </button>
                   <button onclick="edition.showForm(${classe.id})" class="btn btn-primary remove-line"> Modifier </button>
                </td>
            </tr>
            `;
        })
    );
};
list.init();