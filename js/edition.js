const edition = {};
edition.users = [];
edition.buttonEdit = jQuery('#button-edit');
edition.buttonCancelEdit = jQuery('#button-cancel-edit');

edition.init = async () => {
    edition.users = await edition.getUsers();
};

edition.getUsers = () => {
    return jQuery.ajax({
        url: "http://localhost:3001/index/utilisateurs",
        method: "GET",

    }).catch((error) => {
        console.warn(error);
        return [];
    });
};

edition.showForm = (classeId) => {
    edition.cleanForm();
    if (classeId) {
        edition.populate(classeId);
    }
    jQuery('#container-form').fadeIn();
    jQuery('#list-classes').hide();
    edition.buttonEdit.hide();
    edition.buttonCancelEdit.show();
}

edition.populate = (classeId) => {
    const classe = list.classes.find(classe => classe.id === classeId);
    if (classe) {
        jQuery('#id_utilisateur').val(classe.id_utilisateur);
        jQuery('#div-id_utilisateur').hide();
        jQuery('#id').val(classe.id);
        jQuery('#nom_classe').val(classe.nom_classe);
        jQuery('#niveau').val(classe.niveau);
        jQuery('#sexe').val(classe.sexe);
    }
}

edition.cleanForm = () => {
    jQuery('#id_utilisateur').val('');
    jQuery('#div-id_utilisateur').fadeIn('fast');
    jQuery('#id').val('');
    jQuery('#nom_classe').val('');
    jQuery('#niveau').val('');
    jQuery('#sexe').val('');
};

edition.hideForm = () => {
    jQuery('#container-form').hide();
    jQuery('#list-classes').fadeIn();
    edition.buttonEdit.show();
    edition.buttonCancelEdit.hide();
}

edition.save = async (event) => {
    event.preventDefault();
    const id_utilisateur = jQuery('#id_utilisateur').val();
    const id = jQuery('#id').val();
    const isEdition = id.length > 0;
    const nom_classe = jQuery('#nom_classe').val();
    const niveau = jQuery('#niveau').val();
    const sexe = jQuery('#sexe').val();
    let url = `http://localhost:3001/index/classe`;
    if (isEdition) {
        url += `/${id}`;
    }

    try {
        const newClasse = await jQuery.ajax({
            url,
            method: "POST",
            data: {
                id_utilisateur,
                nom_classe,
                niveau,
                sexe
            }
        });
        if (isEdition) {
            list.init();
        } else {
            list.importClassesInTable([newClasse]);
            list.classes.push(newClasse);
            list.init();
        }
        edition.hideForm();
    } catch (error) {
        console.error(error);
    }
}
edition.init();