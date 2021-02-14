const edition = {};

edition.buttonEdit = jQuery('#button-edit');
edition.buttonCancelEdit = jQuery('#button-cancel-edit');

edition.showForm = (classeId) => {
    edition.cleanForm();
    if (classeId) {
        edition.populate(classeId);
    }
    jQuery('#container-form').fadeIn();
    edition.buttonEdit.hide();
    edition.buttonCancelEdit.show();
}

edition.populate = (classeId) => {
    const classe = list.classes.find(classe => classe.id === classeId);
    if (classe) {
        jQuery('#id').val(classe.id);
        jQuery('#pseudo').val(classe.pseudo);
        jQuery('#nom_classe').val(classe.nom_classe);
        jQuery('#niveau').val(classe.niveau);
        jQuery('#sexe').val(classe.sexe);
    }
}

edition.cleanForm = () => {
    jQuery('#id').val('');
    jQuery('#pseudo').val('');
    jQuery('#nom_classe').val('');
    jQuery('#niveau').val('');
    jQuery('#sexe').val('');
};

edition.hideForm = () => {
    jQuery('#container-form').fadeOut();
    edition.buttonEdit.show();
    edition.buttonCancelEdit.hide();
}

edition.save = async (event) => {
    event.preventDefault();
    const id = jQuery('#id').val();
    const isEdition = id.length > 0;
    const pseudo = jQuery('#pseudo').val();
    const nom_classe = jQuery('#nom_classe').val();
    const niveau = jQuery('#niveau').val();
    const sexe = jQuery('#sexe').val();
    let url = `http://localhost:3001/index/classes`;
    if (isEdition) {
        url += `/${id}`;
    }

    try {
        const newClasse = await jQuery.ajax({
            url,
            method: "POST",
            data: {
                pseudo,
                nom_classe,
                niveau,
                sexe,
            }
        });
        if (isEdition) {
            list.init();
        } else {
            list.importClassesInTable([newClasse]);
        }
        edition.hideForm();
    } catch (error) {
        console.error(error);
    }
}