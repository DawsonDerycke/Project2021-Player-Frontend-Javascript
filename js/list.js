const list = {};
list.classes = [];
list.classeToRemove = null;
list.init = async () => {
    list.classes = await list.getClasses();
    list.importClassesInTable(list.classes, true);
};

list.getClasses = () => {
    return jQuery.ajax({
        url: "http://localhost:3001/index/classes",
        method: "GET",

    }).catch((error) => {
        console.warn(error);
        return [];
    });
};

list.confirmRemove = (classeId) => {
    list.classeToRemove = classeId;
    jQuery("#remove-line-modal").modal("toggle");
}

list.remove = async () => {
    const classeId = list.classeToRemove;
    try {
        await jQuery.ajax({
            url: `http://localhost:3001/index/classes${classeId}`,
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
                <td> ${classe.id} </td>
                <td> ${classe.pseudo} </td>
                <td> ${classe.nom_classe} </td>
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