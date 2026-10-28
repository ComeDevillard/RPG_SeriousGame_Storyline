window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script5 = function()
{
  const pad = value => String(value).padStart(2, '0');
const formatDate = date => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
const formatMoisAnnee = date => `${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
const ajouterMois = (date, nombreDeMois) => {
  const resultat = new Date(date);
  resultat.setMonth(resultat.getMonth() + nombreDeMois);
  return resultat;
};

const aujourdHui = new Date();
const reunionCrise = new Date(aujourdHui);
reunionCrise.setDate(reunionCrise.getDate() - 7);

const mailPoursuite = ajouterMois(reunionCrise, -2);
const alerteAnomalie = ajouterMois(reunionCrise, -3);
const debutProjet = ajouterMois(reunionCrise, -6);

setVar('Date_Jour', formatDate(aujourdHui));
setVar('Date_ReunionCrise', formatDate(reunionCrise));
setVar('Date_MailPoursuite', formatMoisAnnee(mailPoursuite));
setVar('Date_AlerteAnomalie', formatMoisAnnee(alerteAnomalie));
setVar('Date_DebutProjet', formatMoisAnnee(debutProjet));
}

window.Script6 = function()
{
  // Références aux éléments principaux de la scène.
const personnage = object('6RGFnBtJUtY');
const zone = object('5tFM8YCp396');
const doorUp = object('6jBImbji2qm');
const doorLeft = object('6rZ3i5tvrRl');
const doorDown = object('5mLPH5VndVd');
const doorRight = object('62JOh2iTPo9');
const joystick = object('6b0YNw84J4e');
const joystickRange = object('6ajh90bvffE');
const boutonInteragir = object('5oc4CsUTiGJ');

// Portes et obstacles qui empêchent le passage.
const portes = [doorUp, doorLeft, doorDown, doorRight];
const blocs = [
  object('64ZR0sBEaTZ'),
  object('5gjoiCyQakR'),
  object('6S2m7nZ9JaR'),
  object('5W9aUmLV2Uy'),
  object('6HgCSGmjG0t'),
  object('5UzhgA4R2EE'),
  object('6oKfB2pJTKG'),
  object('6ItGlrpAwI5'),
  object('5x2NVH3FIFR'),
  object('5vJ1JfR7IaH'),
  object('6TmliAcJJcG')
];

// Objets interactifs : chacun augmente sa variable Storyline associée.
const objets = [
  { obj: object('6EnqlWOfeUw'), variable: 'OBJ_1_SMS' },
  { obj: object('5kh5VE2WfGI'), variable: 'OBJ_2_Postit' },
  { obj: object('6pPx2WjFRN9'), variable: 'OBJ_3_Photo' },
  { obj: object('5awSyHDhZqL'), variable: 'OBJ_4_Badge' },
  { obj: object('5hvWLZ2pDz2'), variable: 'OBJ_5_Fleur' }
];

// PNJ interactifs : chacun augmente sa variable Storyline associée.
const pnjs = [
  { obj: object('6TmliAcJJcG'), variable: 'PNJ_1_Marvin' },
  { obj: object('5vJ1JfR7IaH'), variable: 'PNJ_2_Amine' },
  { obj: object('5x2NVH3FIFR'), variable: 'PNJ_3_Ali' },
  { obj: object('6ItGlrpAwI5'), variable: 'PNJ_4_Karine' },
  { obj: object('6oKfB2pJTKG'), variable: 'PNJ_5_Rebecca' },
  { obj: object('5UzhgA4R2EE'), variable: 'PNJ_6_Charlotte' }
];

// Position initiale du joystick et de sa zone tactile.
const joystickPositionInitiale = {
  x: joystick.x,
  y: joystick.y
};
const rangePositionInitiale = {
  x: joystickRange.x,
  y: joystickRange.y
};
const centreJoystickInitial = {
  x: joystick.x + joystick.width / 2,
  y: joystick.y + joystick.height / 2
};

// Paramètres généraux.
const interactions = [...objets, ...pnjs];
const vitesse = Number(getVar('VAR_Vitesse')) || 10;
const personnageRotation = Number(getVar('VAR_PersonnageOrientation')) || 0;
const startDecal = Number(getVar('VAR_StartDecal')) || 0;

const rayonJoystick = 100;
const seuilDeplacementJoystick = 40;
const margeInteraction = 35;

// Marge de sécurité à l'arrivée d'une porte.
const margeArrivee = startDecal > 0 ? startDecal : 5;

// Repositionne le personnage selon la porte de provenance.
const doorOpenDown = getVar('DOOR_OpenDown');
const doorOpenUp = getVar('DOOR_OpenUp');
const doorOpenLeft = getVar('DOOR_OpenLeft');
const doorOpenRight = getVar('DOOR_OpenRight');

if (doorOpenDown) {
  personnage.x = doorUp.x + doorUp.width / 2 - personnage.width / 2;
  personnage.y = doorUp.y + doorUp.height + margeArrivee;
} else if (doorOpenUp) {
  personnage.x = doorDown.x + doorDown.width / 2 - personnage.width / 2;
  personnage.y = doorDown.y - personnage.height - margeArrivee;
} else if (doorOpenLeft) {
  personnage.x = doorRight.x - personnage.width - margeArrivee;
  personnage.y = doorRight.y + doorRight.height / 2 - personnage.height / 2;
} else if (doorOpenRight) {
  personnage.x = doorLeft.x + doorLeft.width + margeArrivee;
  personnage.y = doorLeft.y + doorLeft.height / 2 - personnage.height / 2;
}

// Oriente le personnage vers le centre après son repositionnement.
const centreZone = {
  x: zone.x + zone.width / 2,
  y: zone.y + zone.height / 2
};
const dxInit = centreZone.x - personnage.x - personnage.width / 2;
const dyInit = centreZone.y - personnage.y - personnage.height / 2;
personnage.rotation = Math.atan2(dyInit, dxInit) * 180 / Math.PI + personnageRotation;

// États de déplacement et d'interaction.
let porteDeclenchee = false;
let joystickActif = false;
let toucheEEnfoncee = false;

// Limite une valeur entre un minimum et un maximum.
const limiter = (valeur, min, max) => Math.max(min, Math.min(max, valeur));

// Indique si le personnage chevauche une cible.
const toucheCible = (x, y, cible, marge = 0) => (
  x < cible.x + cible.width + marge &&
  x + personnage.width > cible.x - marge &&
  y < cible.y + cible.height + marge &&
  y + personnage.height > cible.y - marge
);

// Zone de collision de porte limitée à la zone de déplacement.
const zoneCollisionPorte = porte => {
  const x = Math.max(porte.x, zone.x);
  const y = Math.max(porte.y, zone.y);
  const droite = Math.min(porte.x + porte.width, zone.x + zone.width);
  const bas = Math.min(porte.y + porte.height, zone.y + zone.height);

  return {
    x,
    y,
    width: Math.max(0, droite - x),
    height: Math.max(0, bas - y)
  };
};

// Vérifie si la prochaine position entre dans un obstacle.
const collisionBloc = (x, y) => blocs.some(bloc => toucheCible(x, y, bloc));

// Oriente le personnage dans la direction de son mouvement.
const orienter = (dx, dy) => {
  if (dx || dy) {
    personnage.rotation = Math.atan2(dy, dx) * 180 / Math.PI + personnageRotation;
  }
};

// Replace le joystick et sa zone tactile à leur position d'origine.
const reinitialiserJoystick = () => {
  joystickActif = false;
  joystick.x = joystickPositionInitiale.x;
  joystick.y = joystickPositionInitiale.y;
  joystickRange.x = rangePositionInitiale.x;
  joystickRange.y = rangePositionInitiale.y;
};

// Ouvre une porte lorsque le personnage touche sa zone de collision.
const ouvrirPorteAuContact = () => {
  const porte = portes.find(porte =>
    toucheCible(personnage.x, personnage.y, zoneCollisionPorte(porte))
  );

  if (porte && porte.state !== 'Masqué') {
    reinitialiserJoystick();
    porteDeclenchee = true;
    porte.state = 'OPEN';
  }
};

// Déplace le personnage sans sortir de la zone ni traverser les obstacles.
const deplacer = (x, y) => {
  if (porteDeclenchee) {
    return;
  }

  const minX = zone.x;
  const maxX = zone.x + zone.width - personnage.width;
  const minY = zone.y;
  const maxY = zone.y + zone.height - personnage.height;

  const prochainX = limiter(x, minX, maxX);
  const prochainY = limiter(y, minY, maxY);

  if (!collisionBloc(prochainX, personnage.y)) {
    personnage.x = prochainX;
  }

  if (!collisionBloc(personnage.x, prochainY)) {
    personnage.y = prochainY;
  }

  ouvrirPorteAuContact();
};

// Interagit avec le premier objet ou PNJ assez proche.
const interagirAuContact = () => {
  if (porteDeclenchee) {
    return;
  }

  const cible = interactions.find(item =>
    toucheCible(personnage.x, personnage.y, item.obj, margeInteraction)
  );

  if (cible) {
    setVar(cible.variable, Number(getVar(cible.variable)) + 1);
  }
};

// Active le joystick pour les évènements pointeur, y compris tactiles.
const activerJoystick = () => {
  if (!porteDeclenchee && !Boolean(getVar('A_Clavier'))) {
    joystickActif = true;
  }
};

const desactiverJoystick = () => {
  reinitialiserJoystick();
};

reinitialiserJoystick();

// Empêche le navigateur de traiter le joystick comme un geste de défilement ou de zoom.
joystickRange.style.cursor = 'pointer';
joystickRange.style.touchAction = 'none';
joystick.style.touchAction = 'none';
boutonInteragir.style.cursor = 'pointer';
boutonInteragir.style.touchAction = 'manipulation';

// Le pointerdown démarre le contrôle. Le pointerup relâche le contrôle.
// Le pointerout couvre le cas où le doigt ou le pointeur sort de la zone tactile.
joystickRange.pointerdown(() => {
  activerJoystick();
});
joystickRange.pointerup(() => {
  desactiverJoystick();
});
joystickRange.pointerout(() => {
  desactiverJoystick();
});

// BTN_E : actif uniquement lorsque A_Clavier est faux.
boutonInteragir.click(() => {
  if (!Boolean(getVar('A_Clavier'))) {
    interagirAuContact();
  }
});

// Boucle principale : clavier, joystick et interaction E.
update(() => {
  if (porteDeclenchee) {
    return;
  }

  const clavierActif = Boolean(getVar('A_Clavier'));
  const touches = getKeyDown();
  let dx = 0;
  let dy = 0;

  if (clavierActif) {
    reinitialiserJoystick();

    // Déplacements ZQSD et flèches.
    dx = (touches.d || touches.D || touches.ArrowRight ? 1 : 0) -
         (touches.q || touches.Q || touches.ArrowLeft ? 1 : 0);

    dy = (touches.s || touches.S || touches.ArrowDown ? 1 : 0) -
         (touches.z || touches.Z || touches.ArrowUp ? 1 : 0);

    // Interaction E : une seule fois par appui.
    const toucheE = Boolean(touches.e || touches.E);

    if (toucheE && !toucheEEnfoncee) {
      interagirAuContact();
    }

    toucheEEnfoncee = toucheE;
  } else if (joystickActif) {
    toucheEEnfoncee = false;

    // pointerX() et pointerY() fonctionnent avec souris et contact tactile.
    joystickRange.x = pointerX() - joystickRange.width / 2;
    joystickRange.y = pointerY() - joystickRange.height / 2;

    const ecartX = pointerX() - centreJoystickInitial.x;
    const ecartY = pointerY() - centreJoystickInitial.y;
    const distance = Math.sqrt(ecartX * ecartX + ecartY * ecartY);
    const ratio = distance > rayonJoystick ? rayonJoystick / distance : 1;

    joystick.x = centreJoystickInitial.x + ecartX * ratio - joystick.width / 2;
    joystick.y = centreJoystickInitial.y + ecartY * ratio - joystick.height / 2;

    if (distance > seuilDeplacementJoystick) {
      if (Math.abs(ecartX) >= Math.abs(ecartY)) {
        dx = ecartX > 0 ? 1 : -1;
      } else {
        dy = ecartY > 0 ? 1 : -1;
      }
    }
  } else {
    toucheEEnfoncee = false;
  }

  // Applique le déplacement.
  if (dx || dy) {
    orienter(dx, dy);
    deplacer(
      personnage.x + dx * vitesse / 2,
      personnage.y + dy * vitesse / 2
    );
  }
});
}

window.Script7 = function()
{
  // Références aux éléments principaux de la scène.
const personnage = object('5aw8K8kkGq1');
const zone = object('6aMw9kKPCGq');
const doorUp = object('6PQgIS4cMfU');
const doorLeft = object('5sd5sCg8HSt');
const doorDown = object('6BWyKW9sBCr');
const doorRight = object('6GISfKk1Tgj');
const joystick = object('6YKjH3C9Thw');
const joystickRange = object('5kau2wcMGk0');
const boutonInteragir = object('61sFTbc0arU');

// Portes et obstacles qui empêchent le passage.
// Tous les objets actuels dont le nom commence par « Bloc_ » sont inclus ici.
const portes = [doorUp, doorLeft, doorDown, doorRight];
const blocs = [
  object('60YpVkMaiOZ'),
  object('6SHd57QkPd1'),
  object('5dq049QdPj5'),
  object('6L0uDbTwUcu'),
  object('6ineSTzwzJZ'),
  object('6drCl6LwNc3'),
  object('5eFKi8aNOBS'),
  object('6R4z5CAI1fG'),
  object('6kFCY687PbV'),
  object('5dC666tRdHQ'),
  object('5n8szGtPbEq')
];

// Objets interactifs : chaque élément augmente sa variable Storyline associée.
const objets = [
  { obj: object('60iuE2lS8xa'), variable: 'OBJ_1_Smartphone' },
  { obj: object('6PMl5s2ixhc'), variable: 'OBJ_2_Postit' },
  { obj: object('5tjIxUQD3us'), variable: 'OBJ_3_Photo' },
  { obj: object('6KXDnsg14vp'), variable: 'OBJ_4_Badge' },
  { obj: object('5frRd6yyI4t'), variable: 'OBJ_5_Fleur' }
];

// PNJ interactifs : chaque élément augmente sa variable Storyline associée.
const pnjs = [
  { obj: object('5qI55yE2zB3'), variable: 'PNJ_1_Marvin' },
  { obj: object('5e1aYSs3ft4'), variable: 'PNJ_2_Amine' },
  { obj: object('6nf2RoolpBC'), variable: 'PNJ_3_Ali' },
  { obj: object('6mSmc7cCSDV'), variable: 'PNJ_4_Karine' },
  { obj: object('6Q3kHDMhnoq'), variable: 'PNJ_5_Rebecca' },
  { obj: object('6DoYGX3OEMM'), variable: 'PNJ_6_Charlotte' }
];

// Position initiale du joystick et de sa zone tactile.
const joystickPositionInitiale = {
  x: joystick.x,
  y: joystick.y
};
const rangePositionInitiale = {
  x: joystickRange.x,
  y: joystickRange.y
};
const centreJoystickInitial = {
  x: joystick.x + joystick.width / 2,
  y: joystick.y + joystick.height / 2
};

// Paramètres généraux.
const interactions = [...objets, ...pnjs];
const vitesse = Number(getVar('VAR_Vitesse')) || 10;
const personnageRotation = Number(getVar('VAR_PersonnageOrientation')) || 0;
const startDecal = Number(getVar('VAR_StartDecal')) || 0;

const rayonJoystick = 100;
const seuilDeplacementJoystick = 40;
const margeInteraction = 35;

// Marge de sécurité à l'arrivée d'une porte.
const margeArrivee = startDecal > 0 ? startDecal : 5;

// Repositionne le personnage selon la porte de provenance.
const doorOpenDown = getVar('DOOR_OpenDown');
const doorOpenUp = getVar('DOOR_OpenUp');
const doorOpenLeft = getVar('DOOR_OpenLeft');
const doorOpenRight = getVar('DOOR_OpenRight');

if (doorOpenDown) {
  personnage.x = doorUp.x + doorUp.width / 2 - personnage.width / 2;
  personnage.y = doorUp.y + doorUp.height + margeArrivee;
} else if (doorOpenUp) {
  personnage.x = doorDown.x + doorDown.width / 2 - personnage.width / 2;
  personnage.y = doorDown.y - personnage.height - margeArrivee;
} else if (doorOpenLeft) {
  personnage.x = doorRight.x - personnage.width - margeArrivee;
  personnage.y = doorRight.y + doorRight.height / 2 - personnage.height / 2;
} else if (doorOpenRight) {
  personnage.x = doorLeft.x + doorLeft.width + margeArrivee;
  personnage.y = doorLeft.y + doorLeft.height / 2 - personnage.height / 2;
}

// Oriente le personnage vers le centre après son repositionnement.
const centreZone = {
  x: zone.x + zone.width / 2,
  y: zone.y + zone.height / 2
};
const dxInit = centreZone.x - personnage.x - personnage.width / 2;
const dyInit = centreZone.y - personnage.y - personnage.height / 2;
personnage.rotation = Math.atan2(dyInit, dxInit) * 180 / Math.PI + personnageRotation;

// États de déplacement et d'interaction.
let porteDeclenchee = false;
let joystickActif = false;
let toucheEEnfoncee = false;

// Limite une valeur entre un minimum et un maximum.
const limiter = (valeur, min, max) => Math.max(min, Math.min(max, valeur));

// Indique si le personnage chevauche une cible.
const toucheCible = (x, y, cible, marge = 0) => (
  x < cible.x + cible.width + marge &&
  x + personnage.width > cible.x - marge &&
  y < cible.y + cible.height + marge &&
  y + personnage.height > cible.y - marge
);

// Zone de collision de porte limitée à la zone de déplacement.
const zoneCollisionPorte = porte => {
  const x = Math.max(porte.x, zone.x);
  const y = Math.max(porte.y, zone.y);
  const droite = Math.min(porte.x + porte.width, zone.x + zone.width);
  const bas = Math.min(porte.y + porte.height, zone.y + zone.height);

  return {
    x,
    y,
    width: Math.max(0, droite - x),
    height: Math.max(0, bas - y)
  };
};

// Vérifie si la prochaine position entre dans un obstacle.
const collisionBloc = (x, y) => blocs.some(bloc => toucheCible(x, y, bloc));

// Oriente le personnage dans la direction de son mouvement.
const orienter = (dx, dy) => {
  if (dx || dy) {
    personnage.rotation = Math.atan2(dy, dx) * 180 / Math.PI + personnageRotation;
  }
};

// Replace le joystick et sa zone tactile à leur position d'origine.
const reinitialiserJoystick = () => {
  joystickActif = false;
  joystick.x = joystickPositionInitiale.x;
  joystick.y = joystickPositionInitiale.y;
  joystickRange.x = rangePositionInitiale.x;
  joystickRange.y = rangePositionInitiale.y;
};

// Ouvre une porte lorsque le personnage touche sa zone de collision.
const ouvrirPorteAuContact = () => {
  const porte = portes.find(porte =>
    toucheCible(personnage.x, personnage.y, zoneCollisionPorte(porte))
  );

  if (porte && porte.state !== 'Masqué') {
    reinitialiserJoystick();
    porteDeclenchee = true;
    porte.state = 'OPEN';
  }
};

// Déplace le personnage sans sortir de la zone ni traverser les obstacles.
const deplacer = (x, y) => {
  if (porteDeclenchee) {
    return;
  }

  const minX = zone.x;
  const maxX = zone.x + zone.width - personnage.width;
  const minY = zone.y;
  const maxY = zone.y + zone.height - personnage.height;

  const prochainX = limiter(x, minX, maxX);
  const prochainY = limiter(y, minY, maxY);

  if (!collisionBloc(prochainX, personnage.y)) {
    personnage.x = prochainX;
  }

  if (!collisionBloc(personnage.x, prochainY)) {
    personnage.y = prochainY;
  }

  ouvrirPorteAuContact();
};

// Interagit avec le premier objet ou PNJ assez proche.
const interagirAuContact = () => {
  if (porteDeclenchee) {
    return;
  }

  const cible = interactions.find(item =>
    toucheCible(personnage.x, personnage.y, item.obj, margeInteraction)
  );

  if (cible) {
    setVar(cible.variable, Number(getVar(cible.variable)) + 1);
  }
};

// Active le joystick pour les évènements pointeur, y compris tactiles.
const activerJoystick = () => {
  if (!porteDeclenchee && !Boolean(getVar('A_Clavier'))) {
    joystickActif = true;
  }
};

const desactiverJoystick = () => {
  reinitialiserJoystick();
};

reinitialiserJoystick();

// Empêche le navigateur de traiter le joystick comme un geste de défilement ou de zoom.
joystickRange.style.cursor = 'pointer';
joystickRange.style.touchAction = 'none';
joystick.style.touchAction = 'none';
boutonInteragir.style.cursor = 'pointer';
boutonInteragir.style.touchAction = 'manipulation';

// Le pointerdown démarre le contrôle. Le pointerup relâche le contrôle.
// Le pointerout couvre le cas où le doigt ou le pointeur sort de la zone tactile.
joystickRange.pointerdown(() => {
  activerJoystick();
});
joystickRange.pointerup(() => {
  desactiverJoystick();
});
joystickRange.pointerout(() => {
  desactiverJoystick();
});

// BTN_E : actif uniquement lorsque A_Clavier est faux.
boutonInteragir.click(() => {
  if (!Boolean(getVar('A_Clavier'))) {
    interagirAuContact();
  }
});

// Boucle principale : clavier, joystick et interaction E.
update(() => {
  if (porteDeclenchee) {
    return;
  }

  const clavierActif = Boolean(getVar('A_Clavier'));
  const touches = getKeyDown();
  let dx = 0;
  let dy = 0;

  if (clavierActif) {
    reinitialiserJoystick();

    // Déplacements ZQSD et flèches.
    dx = (touches.d || touches.D || touches.ArrowRight ? 1 : 0) -
         (touches.q || touches.Q || touches.ArrowLeft ? 1 : 0);

    dy = (touches.s || touches.S || touches.ArrowDown ? 1 : 0) -
         (touches.z || touches.Z || touches.ArrowUp ? 1 : 0);

    // Interaction E : une seule fois par appui.
    const toucheE = Boolean(touches.e || touches.E);

    if (toucheE && !toucheEEnfoncee) {
      interagirAuContact();
    }

    toucheEEnfoncee = toucheE;
  } else if (joystickActif) {
    toucheEEnfoncee = false;

    // pointerX() et pointerY() fonctionnent avec souris et contact tactile.
    joystickRange.x = pointerX() - joystickRange.width / 2;
    joystickRange.y = pointerY() - joystickRange.height / 2;

    const ecartX = pointerX() - centreJoystickInitial.x;
    const ecartY = pointerY() - centreJoystickInitial.y;
    const distance = Math.sqrt(ecartX * ecartX + ecartY * ecartY);
    const ratio = distance > rayonJoystick ? rayonJoystick / distance : 1;

    joystick.x = centreJoystickInitial.x + ecartX * ratio - joystick.width / 2;
    joystick.y = centreJoystickInitial.y + ecartY * ratio - joystick.height / 2;

    if (distance > seuilDeplacementJoystick) {
      if (Math.abs(ecartX) >= Math.abs(ecartY)) {
        dx = ecartX > 0 ? 1 : -1;
      } else {
        dy = ecartY > 0 ? 1 : -1;
      }
    }
  } else {
    toucheEEnfoncee = false;
  }

  // Applique le déplacement.
  if (dx || dy) {
    orienter(dx, dy);
    deplacer(
      personnage.x + dx * vitesse / 2,
      personnage.y + dy * vitesse / 2
    );
  }
});

}

window.Script8 = function()
{
  // Références aux éléments principaux de la scène.
const personnage = object('6JMnknVMPTb');
const zone = object('6QYXzApBWFA');
const doorUp = object('67Fj7vTDDBn');
const doorLeft = object('5t6IAn46r1I');
const doorDown = object('6Dgh8k0QoGo');
const doorRight = object('6Viurruehxj');
const joystick = object('6EU8Oe05ihb');
const joystickRange = object('6A5S9O05msd');
const boutonInteragir = object('5nSgt0Vof64');

// Portes et obstacles qui empêchent le passage.
const portes = [doorUp, doorLeft, doorDown, doorRight];
const blocs = [
  object('6rK7ujhK2XJ'),
  object('6cJVUdHTJzw'),
  object('63nAyK7754F'),
  object('5fnvIt3RKI6'),
  object('5We1c2fEZvL'),
  object('6TowvraL4Jz'),
  object('5Y4b5A9EgOk'),
  object('6AsZld0cHkh'),
  object('5dB03fNaXpR')
];

// Objets interactifs : chaque élément augmente sa variable Storyline associée.
const objets = [
  { obj: object('6R9wGaTHDCw'), variable: 'OBJ_1_Smartphone' },
  { obj: object('6NPSvbqAE3T'), variable: 'OBJ_2_Postit' },
  { obj: object('5rEFxo13je1'), variable: 'OBJ_3_Photo' },
  { obj: object('5q29AiQLbNw'), variable: 'OBJ_4_Badge' },
  { obj: object('6lU0ir13j2s'), variable: 'OBJ_6_Sondage' }
];

// PNJ interactifs : chaque élément augmente sa variable Storyline associée.
const pnjs = [
  { obj: object('6hWPP24wyPB'), variable: 'PNJ_1' },
  { obj: object('6F3Z3WodoMQ'), variable: 'PNJ_2' },
  { obj: object('5X6dfbLztOt'), variable: 'PNJ_3' },
  { obj: object('5bfm2hC6uhP'), variable: 'PNJ_4' },
  { obj: object('6FZJ0OtgD3m'), variable: 'PNJ_5_Rebecca' },
  { obj: object('5hDX9Yih0Hg'), variable: 'PNJ_6' }
];

// Position initiale du joystick et de sa zone tactile.
const joystickPositionInitiale = {
  x: joystick.x,
  y: joystick.y
};
const rangePositionInitiale = {
  x: joystickRange.x,
  y: joystickRange.y
};
const centreJoystickInitial = {
  x: joystick.x + joystick.width / 2,
  y: joystick.y + joystick.height / 2
};

// Paramètres généraux.
const interactions = [...objets, ...pnjs];
const vitesse = Number(getVar('VAR_Vitesse')) || 10;
const personnageRotation = Number(getVar('VAR_PersonnageOrientation')) || 0;
const startDecal = Number(getVar('VAR_StartDecal')) || 0;

const rayonJoystick = 100;
const seuilDeplacementJoystick = 40;
const margeInteraction = 35;

// Marge de sécurité à l'arrivée d'une porte.
const margeArrivee = startDecal > 0 ? startDecal : 5;

// Repositionne le personnage selon la porte de provenance.
const doorOpenDown = getVar('DOOR_OpenDown');
const doorOpenUp = getVar('DOOR_OpenUp');
const doorOpenLeft = getVar('DOOR_OpenLeft');
const doorOpenRight = getVar('DOOR_OpenRight');

if (doorOpenDown) {
  personnage.x = doorUp.x + doorUp.width / 2 - personnage.width / 2;
  personnage.y = doorUp.y + doorUp.height + margeArrivee;
} else if (doorOpenUp) {
  personnage.x = doorDown.x + doorDown.width / 2 - personnage.width / 2;
  personnage.y = doorDown.y - personnage.height - margeArrivee;
} else if (doorOpenLeft) {
  personnage.x = doorRight.x - personnage.width - margeArrivee;
  personnage.y = doorRight.y + doorRight.height / 2 - personnage.height / 2;
} else if (doorOpenRight) {
  personnage.x = doorLeft.x + doorLeft.width + margeArrivee;
  personnage.y = doorLeft.y + doorLeft.height / 2 - personnage.height / 2;
}

// Oriente le personnage vers le centre après son repositionnement.
const centreZone = {
  x: zone.x + zone.width / 2,
  y: zone.y + zone.height / 2
};
const dxInit = centreZone.x - personnage.x - personnage.width / 2;
const dyInit = centreZone.y - personnage.y - personnage.height / 2;
personnage.rotation = Math.atan2(dyInit, dxInit) * 180 / Math.PI + personnageRotation;

// États de déplacement et d'interaction.
let porteDeclenchee = false;
let joystickActif = false;
let toucheEEnfoncee = false;

// Limite une valeur entre un minimum et un maximum.
const limiter = (valeur, min, max) => Math.max(min, Math.min(max, valeur));

// Indique si le personnage chevauche une cible.
const toucheCible = (x, y, cible, marge = 0) => (
  x < cible.x + cible.width + marge &&
  x + personnage.width > cible.x - marge &&
  y < cible.y + cible.height + marge &&
  y + personnage.height > cible.y - marge
);

// Zone de collision de porte limitée à la zone de déplacement.
const zoneCollisionPorte = porte => {
  const x = Math.max(porte.x, zone.x);
  const y = Math.max(porte.y, zone.y);
  const droite = Math.min(porte.x + porte.width, zone.x + zone.width);
  const bas = Math.min(porte.y + porte.height, zone.y + zone.height);

  return {
    x,
    y,
    width: Math.max(0, droite - x),
    height: Math.max(0, bas - y)
  };
};

// Vérifie si la prochaine position entre dans un obstacle.
const collisionBloc = (x, y) => blocs.some(bloc => toucheCible(x, y, bloc));

// Oriente le personnage dans la direction de son mouvement.
const orienter = (dx, dy) => {
  if (dx || dy) {
    personnage.rotation = Math.atan2(dy, dx) * 180 / Math.PI + personnageRotation;
  }
};

// Replace le joystick et sa zone tactile à leur position d'origine.
const reinitialiserJoystick = () => {
  joystickActif = false;
  joystick.x = joystickPositionInitiale.x;
  joystick.y = joystickPositionInitiale.y;
  joystickRange.x = rangePositionInitiale.x;
  joystickRange.y = rangePositionInitiale.y;
};

// Ouvre une porte lorsque le personnage touche sa zone de collision.
const ouvrirPorteAuContact = () => {
  const porte = portes.find(porte =>
    toucheCible(personnage.x, personnage.y, zoneCollisionPorte(porte))
  );

  if (porte && porte.state !== 'Masqué') {
    reinitialiserJoystick();
    porteDeclenchee = true;
    porte.state = 'OPEN';
  }
};

// Déplace le personnage sans sortir de la zone ni traverser les obstacles.
const deplacer = (x, y) => {
  if (porteDeclenchee) {
    return;
  }

  const minX = zone.x;
  const maxX = zone.x + zone.width - personnage.width;
  const minY = zone.y;
  const maxY = zone.y + zone.height - personnage.height;

  const prochainX = limiter(x, minX, maxX);
  const prochainY = limiter(y, minY, maxY);

  if (!collisionBloc(prochainX, personnage.y)) {
    personnage.x = prochainX;
  }

  if (!collisionBloc(personnage.x, prochainY)) {
    personnage.y = prochainY;
  }

  ouvrirPorteAuContact();
};

// Interagit avec le premier objet ou PNJ assez proche.
const interagirAuContact = () => {
  if (porteDeclenchee) {
    return;
  }

  const cible = interactions.find(item =>
    toucheCible(personnage.x, personnage.y, item.obj, margeInteraction)
  );

  if (cible) {
    setVar(cible.variable, Number(getVar(cible.variable)) + 1);
  }
};

// Active le joystick pour les évènements pointeur, y compris tactiles.
const activerJoystick = () => {
  if (!porteDeclenchee && !Boolean(getVar('A_Clavier'))) {
    joystickActif = true;
  }
};

const desactiverJoystick = () => {
  reinitialiserJoystick();
};

reinitialiserJoystick();

// Empêche le navigateur de traiter le joystick comme un geste de défilement ou de zoom.
joystickRange.style.cursor = 'pointer';
joystickRange.style.touchAction = 'none';
joystick.style.touchAction = 'none';
boutonInteragir.style.cursor = 'pointer';
boutonInteragir.style.touchAction = 'manipulation';

// Le pointerdown démarre le contrôle. Le pointerup relâche le contrôle.
// Le pointerout couvre le cas où le doigt ou le pointeur sort de la zone tactile.
joystickRange.pointerdown(() => {
  activerJoystick();
});
joystickRange.pointerup(() => {
  desactiverJoystick();
});
joystickRange.pointerout(() => {
  desactiverJoystick();
});

// BTN_E : actif uniquement lorsque A_Clavier est faux.
boutonInteragir.click(() => {
  if (!Boolean(getVar('A_Clavier'))) {
    interagirAuContact();
  }
});

// Boucle principale : clavier, joystick et interaction E.
update(() => {
  if (porteDeclenchee) {
    return;
  }

  const clavierActif = Boolean(getVar('A_Clavier'));
  const touches = getKeyDown();
  let dx = 0;
  let dy = 0;

  if (clavierActif) {
    reinitialiserJoystick();

    // Déplacements ZQSD et flèches.
    dx = (touches.d || touches.D || touches.ArrowRight ? 1 : 0) -
         (touches.q || touches.Q || touches.ArrowLeft ? 1 : 0);

    dy = (touches.s || touches.S || touches.ArrowDown ? 1 : 0) -
         (touches.z || touches.Z || touches.ArrowUp ? 1 : 0);

    // Interaction E : une seule fois par appui.
    const toucheE = Boolean(touches.e || touches.E);

    if (toucheE && !toucheEEnfoncee) {
      interagirAuContact();
    }

    toucheEEnfoncee = toucheE;
  } else if (joystickActif) {
    toucheEEnfoncee = false;

    // pointerX() et pointerY() fonctionnent avec souris et contact tactile.
    joystickRange.x = pointerX() - joystickRange.width / 2;
    joystickRange.y = pointerY() - joystickRange.height / 2;

    const ecartX = pointerX() - centreJoystickInitial.x;
    const ecartY = pointerY() - centreJoystickInitial.y;
    const distance = Math.sqrt(ecartX * ecartX + ecartY * ecartY);
    const ratio = distance > rayonJoystick ? rayonJoystick / distance : 1;

    joystick.x = centreJoystickInitial.x + ecartX * ratio - joystick.width / 2;
    joystick.y = centreJoystickInitial.y + ecartY * ratio - joystick.height / 2;

    if (distance > seuilDeplacementJoystick) {
      if (Math.abs(ecartX) >= Math.abs(ecartY)) {
        dx = ecartX > 0 ? 1 : -1;
      } else {
        dy = ecartY > 0 ? 1 : -1;
      }
    }
  } else {
    toucheEEnfoncee = false;
  }

  // Applique le déplacement.
  if (dx || dy) {
    orienter(dx, dy);
    deplacer(
      personnage.x + dx * vitesse / 2,
      personnage.y + dy * vitesse / 2
    );
  }
});
}

window.Script9 = function()
{
  // Références aux éléments principaux de la scène.
const personnage = object('6A1hEl44AeH');
const zone = object('6GVIF0AkBPJ');
const doorUp = object('6YpNksXfxC6');
const doorLeft = object('5XpBJ3H4X36');
const doorDown = object('5pOLW6z1Pl2');
const doorRight = object('68yhYGdqfnE');
const joystick = object('6oVQ3BhO6k7');
const joystickRange = object('6KYRZbowxxA');
const boutonInteragir = object('63uGSkFtVQI');

// Portes et obstacles qui empêchent le passage.
const portes = [doorUp, doorLeft, doorDown, doorRight];
const blocs = [
  object('6inbQ47TV6O'),
  object('5wmUreZ6cQE'),
  object('6ltX3zpQ7ae'),
  object('5c5FkJ8muSY'),
  object('5YfUiYmB3qm'),
  object('5ieCUShElO7'),
  object('5rYPoRyx6jm'),
  object('69pVIGPIsWB'),
  object('6oTcAn4EeCS')
];

// Objets interactifs : chaque élément augmente sa variable Storyline associée.
const objets = [
  { obj: object('6P6LtlqaG5H'), variable: 'OBJ_1' },
  { obj: object('6jteggjkxPT'), variable: 'OBJ_2' },
  { obj: object('5vKbpkDP5PT'), variable: 'OBJ_3' },
  { obj: object('6SufrLo5vwj'), variable: 'OBJ_8_Ordinateur' },
  { obj: object('6b8N3XrjTR5'), variable: 'OBJ_9_Document' }
];

// PNJ interactifs : chaque élément augmente sa variable Storyline associée.
const pnjs = [
  { obj: object('6FkglioYnE6'), variable: 'PNJ_1' },
  { obj: object('6rBmjt79ljx'), variable: 'PNJ_2' },
  { obj: object('6Eiru3kcreh'), variable: 'PNJ_3' },
  { obj: object('6K98R9nJV2R'), variable: 'PNJ_4' },
  { obj: object('69YZLiUITzM'), variable: 'PNJ_5' },
  { obj: object('63ApZo9y9Ad'), variable: 'PNJ_6' }
];

// Position initiale du joystick et de sa zone tactile.
const joystickPositionInitiale = {
  x: joystick.x,
  y: joystick.y
};
const rangePositionInitiale = {
  x: joystickRange.x,
  y: joystickRange.y
};
const centreJoystickInitial = {
  x: joystick.x + joystick.width / 2,
  y: joystick.y + joystick.height / 2
};

// Paramètres généraux.
const interactions = [...objets, ...pnjs];
const vitesse = Number(getVar('VAR_Vitesse')) || 10;
const personnageRotation = Number(getVar('VAR_PersonnageOrientation')) || 0;
const startDecal = Number(getVar('VAR_StartDecal')) || 0;

const rayonJoystick = 100;
const seuilDeplacementJoystick = 40;
const margeInteraction = 35;

// Marge de sécurité à l'arrivée d'une porte.
const margeArrivee = startDecal > 0 ? startDecal : 5;

// Repositionne le personnage selon la porte de provenance.
const doorOpenDown = getVar('DOOR_OpenDown');
const doorOpenUp = getVar('DOOR_OpenUp');
const doorOpenLeft = getVar('DOOR_OpenLeft');
const doorOpenRight = getVar('DOOR_OpenRight');

if (doorOpenDown) {
  personnage.x = doorUp.x + doorUp.width / 2 - personnage.width / 2;
  personnage.y = doorUp.y + doorUp.height + margeArrivee;
} else if (doorOpenUp) {
  personnage.x = doorDown.x + doorDown.width / 2 - personnage.width / 2;
  personnage.y = doorDown.y - personnage.height - margeArrivee;
} else if (doorOpenLeft) {
  personnage.x = doorRight.x - personnage.width - margeArrivee;
  personnage.y = doorRight.y + doorRight.height / 2 - personnage.height / 2;
} else if (doorOpenRight) {
  personnage.x = doorLeft.x + doorLeft.width + margeArrivee;
  personnage.y = doorLeft.y + doorLeft.height / 2 - personnage.height / 2;
}

// Oriente le personnage vers le centre après son repositionnement.
const centreZone = {
  x: zone.x + zone.width / 2,
  y: zone.y + zone.height / 2
};
const dxInit = centreZone.x - personnage.x - personnage.width / 2;
const dyInit = centreZone.y - personnage.y - personnage.height / 2;
personnage.rotation = Math.atan2(dyInit, dxInit) * 180 / Math.PI + personnageRotation;

// États de déplacement et d'interaction.
let porteDeclenchee = false;
let joystickActif = false;
let toucheEEnfoncee = false;

// Limite une valeur entre un minimum et un maximum.
const limiter = (valeur, min, max) => Math.max(min, Math.min(max, valeur));

// Indique si le personnage chevauche une cible.
const toucheCible = (x, y, cible, marge = 0) => (
  x < cible.x + cible.width + marge &&
  x + personnage.width > cible.x - marge &&
  y < cible.y + cible.height + marge &&
  y + personnage.height > cible.y - marge
);

// Zone de collision de porte limitée à la zone de déplacement.
const zoneCollisionPorte = porte => {
  const x = Math.max(porte.x, zone.x);
  const y = Math.max(porte.y, zone.y);
  const droite = Math.min(porte.x + porte.width, zone.x + zone.width);
  const bas = Math.min(porte.y + porte.height, zone.y + zone.height);

  return {
    x,
    y,
    width: Math.max(0, droite - x),
    height: Math.max(0, bas - y)
  };
};

// Vérifie si la prochaine position entre dans un obstacle.
const collisionBloc = (x, y) => blocs.some(bloc => toucheCible(x, y, bloc));

// Oriente le personnage dans la direction de son mouvement.
const orienter = (dx, dy) => {
  if (dx || dy) {
    personnage.rotation = Math.atan2(dy, dx) * 180 / Math.PI + personnageRotation;
  }
};

// Replace le joystick et sa zone tactile à leur position d'origine.
const reinitialiserJoystick = () => {
  joystickActif = false;
  joystick.x = joystickPositionInitiale.x;
  joystick.y = joystickPositionInitiale.y;
  joystickRange.x = rangePositionInitiale.x;
  joystickRange.y = rangePositionInitiale.y;
};

// Ouvre une porte lorsque le personnage touche sa zone de collision.
const ouvrirPorteAuContact = () => {
  const porte = portes.find(porte =>
    toucheCible(personnage.x, personnage.y, zoneCollisionPorte(porte))
  );

  if (porte && porte.state !== 'Masqué') {
    reinitialiserJoystick();
    porteDeclenchee = true;
    porte.state = 'OPEN';
  }
};

// Déplace le personnage sans sortir de la zone ni traverser les obstacles.
const deplacer = (x, y) => {
  if (porteDeclenchee) {
    return;
  }

  const minX = zone.x;
  const maxX = zone.x + zone.width - personnage.width;
  const minY = zone.y;
  const maxY = zone.y + zone.height - personnage.height;

  const prochainX = limiter(x, minX, maxX);
  const prochainY = limiter(y, minY, maxY);

  if (!collisionBloc(prochainX, personnage.y)) {
    personnage.x = prochainX;
  }

  if (!collisionBloc(personnage.x, prochainY)) {
    personnage.y = prochainY;
  }

  ouvrirPorteAuContact();
};

// Interagit avec le premier objet ou PNJ assez proche.
const interagirAuContact = () => {
  if (porteDeclenchee) {
    return;
  }

  const cible = interactions.find(item =>
    toucheCible(personnage.x, personnage.y, item.obj, margeInteraction)
  );

  if (cible) {
    setVar(cible.variable, Number(getVar(cible.variable)) + 1);
  }
};

// Active le joystick pour les évènements pointeur, y compris tactiles.
const activerJoystick = () => {
  if (!porteDeclenchee && !Boolean(getVar('A_Clavier'))) {
    joystickActif = true;
  }
};

const desactiverJoystick = () => {
  reinitialiserJoystick();
};

reinitialiserJoystick();

// Empêche le navigateur de traiter le joystick comme un geste de défilement ou de zoom.
joystickRange.style.cursor = 'pointer';
joystickRange.style.touchAction = 'none';
joystick.style.touchAction = 'none';
boutonInteragir.style.cursor = 'pointer';
boutonInteragir.style.touchAction = 'manipulation';

// Le pointerdown démarre le contrôle. Le pointerup relâche le contrôle.
// Le pointerout couvre le cas où le doigt ou le pointeur sort de la zone tactile.
joystickRange.pointerdown(() => {
  activerJoystick();
});
joystickRange.pointerup(() => {
  desactiverJoystick();
});
joystickRange.pointerout(() => {
  desactiverJoystick();
});

// BTN_E : actif uniquement lorsque A_Clavier est faux.
boutonInteragir.click(() => {
  if (!Boolean(getVar('A_Clavier'))) {
    interagirAuContact();
  }
});

// Boucle principale : clavier, joystick et interaction E.
update(() => {
  if (porteDeclenchee) {
    return;
  }

  const clavierActif = Boolean(getVar('A_Clavier'));
  const touches = getKeyDown();
  let dx = 0;
  let dy = 0;

  if (clavierActif) {
    reinitialiserJoystick();

    // Déplacements ZQSD et flèches.
    dx = (touches.d || touches.D || touches.ArrowRight ? 1 : 0) -
         (touches.q || touches.Q || touches.ArrowLeft ? 1 : 0);

    dy = (touches.s || touches.S || touches.ArrowDown ? 1 : 0) -
         (touches.z || touches.Z || touches.ArrowUp ? 1 : 0);

    // Interaction E : une seule fois par appui.
    const toucheE = Boolean(touches.e || touches.E);

    if (toucheE && !toucheEEnfoncee) {
      interagirAuContact();
    }

    toucheEEnfoncee = toucheE;
  } else if (joystickActif) {
    toucheEEnfoncee = false;

    // pointerX() et pointerY() fonctionnent avec souris et contact tactile.
    joystickRange.x = pointerX() - joystickRange.width / 2;
    joystickRange.y = pointerY() - joystickRange.height / 2;

    const ecartX = pointerX() - centreJoystickInitial.x;
    const ecartY = pointerY() - centreJoystickInitial.y;
    const distance = Math.sqrt(ecartX * ecartX + ecartY * ecartY);
    const ratio = distance > rayonJoystick ? rayonJoystick / distance : 1;

    joystick.x = centreJoystickInitial.x + ecartX * ratio - joystick.width / 2;
    joystick.y = centreJoystickInitial.y + ecartY * ratio - joystick.height / 2;

    if (distance > seuilDeplacementJoystick) {
      if (Math.abs(ecartX) >= Math.abs(ecartY)) {
        dx = ecartX > 0 ? 1 : -1;
      } else {
        dy = ecartY > 0 ? 1 : -1;
      }
    }
  } else {
    toucheEEnfoncee = false;
  }

  // Applique le déplacement.
  if (dx || dy) {
    orienter(dx, dy);
    deplacer(
      personnage.x + dx * vitesse / 2,
      personnage.y + dy * vitesse / 2
    );
  }
});
}

window.Script10 = function()
{
  // Références aux éléments principaux de la scène.
const personnage = object('6k8gcF8dPfw');
const zone = object('68xmcch44If');
const doorUp = object('6B984bdjCMl');
const doorLeft = object('5rex1ZZjFQI');
const doorDown = object('6oBRj3pYMno');
const doorRight = object('63xeeBfXLob');
const joystick = object('5gyxag5f1sx');
const joystickRange = object('5ivlEgv2Psw');
const boutonInteragir = object('5ioGPSeiDz9');

// Portes et obstacles qui empêchent le passage.
const portes = [doorUp, doorLeft, doorDown, doorRight];
const blocs = [
  object('5zIrY4JPW9R'),
  object('65h0Q8f68KE'),
  object('66RjocxDpOL'),
  object('6O24Tiytg5c'),
  object('6COmV5Fpzca'),
  object('6LIX9BL2Apu'),
  object('6Ukljgilh4R'),
  object('6NGI3QgGW2E'),
  object('6AkUDbqMEDB')
];

// Objets interactifs : chaque élément augmente sa variable Storyline associée.
const objets = [
  { obj: object('69dXSFYTBJD'), variable: 'OBJ_1_Smartphone' },
  { obj: object('6gdpjt6wdTQ'), variable: 'OBJ_2_' },
  { obj: object('5lIdh9fdy1v'), variable: 'OBJ_3_' },
  { obj: object('5mOh3rPRRNv'), variable: 'OBJ_4_' },
  { obj: object('6fubyhhqXPm'), variable: 'OBJ_7_Consignes' }
];

// PNJ interactifs : chaque élément augmente sa variable Storyline associée.
const pnjs = [
  { obj: object('6juJHWxiPih'), variable: 'PNJ_1' },
  { obj: object('5wMvmk4a35e'), variable: 'PNJ_2_Amine' },
  { obj: object('5Zb7E8V08GR'), variable: 'PNJ_3' },
  { obj: object('5kKk6wbRAUY'), variable: 'PNJ_4' },
  { obj: object('6d06SDbl8FD'), variable: 'PNJ_5' },
  { obj: object('5eWYAKWmwCm'), variable: 'PNJ_6_Charlotte' }
];

// Position initiale du joystick et de sa zone tactile.
const joystickPositionInitiale = {
  x: joystick.x,
  y: joystick.y
};
const rangePositionInitiale = {
  x: joystickRange.x,
  y: joystickRange.y
};
const centreJoystickInitial = {
  x: joystick.x + joystick.width / 2,
  y: joystick.y + joystick.height / 2
};

// Paramètres généraux.
const interactions = [...objets, ...pnjs];
const vitesse = Number(getVar('VAR_Vitesse')) || 10;
const personnageRotation = Number(getVar('VAR_PersonnageOrientation')) || 0;
const startDecal = Number(getVar('VAR_StartDecal')) || 0;

const rayonJoystick = 100;
const seuilDeplacementJoystick = 40;
const margeInteraction = 35;

// Marge de sécurité à l'arrivée d'une porte.
const margeArrivee = startDecal > 0 ? startDecal : 5;

// Repositionne le personnage selon la porte de provenance.
const doorOpenDown = getVar('DOOR_OpenDown');
const doorOpenUp = getVar('DOOR_OpenUp');
const doorOpenLeft = getVar('DOOR_OpenLeft');
const doorOpenRight = getVar('DOOR_OpenRight');

if (doorOpenDown) {
  personnage.x = doorUp.x + doorUp.width / 2 - personnage.width / 2;
  personnage.y = doorUp.y + doorUp.height + margeArrivee;
} else if (doorOpenUp) {
  personnage.x = doorDown.x + doorDown.width / 2 - personnage.width / 2;
  personnage.y = doorDown.y - personnage.height - margeArrivee;
} else if (doorOpenLeft) {
  personnage.x = doorRight.x - personnage.width - margeArrivee;
  personnage.y = doorRight.y + doorRight.height / 2 - personnage.height / 2;
} else if (doorOpenRight) {
  personnage.x = doorLeft.x + doorLeft.width + margeArrivee;
  personnage.y = doorLeft.y + doorLeft.height / 2 - personnage.height / 2;
}

// Oriente le personnage vers le centre après son repositionnement.
const centreZone = {
  x: zone.x + zone.width / 2,
  y: zone.y + zone.height / 2
};
const dxInit = centreZone.x - personnage.x - personnage.width / 2;
const dyInit = centreZone.y - personnage.y - personnage.height / 2;
personnage.rotation = Math.atan2(dyInit, dxInit) * 180 / Math.PI + personnageRotation;

// États de déplacement et d'interaction.
let porteDeclenchee = false;
let joystickActif = false;
let toucheEEnfoncee = false;

// Limite une valeur entre un minimum et un maximum.
const limiter = (valeur, min, max) => Math.max(min, Math.min(max, valeur));

// Indique si le personnage chevauche une cible.
const toucheCible = (x, y, cible, marge = 0) => (
  x < cible.x + cible.width + marge &&
  x + personnage.width > cible.x - marge &&
  y < cible.y + cible.height + marge &&
  y + personnage.height > cible.y - marge
);

// Zone de collision de porte limitée à la zone de déplacement.
const zoneCollisionPorte = porte => {
  const x = Math.max(porte.x, zone.x);
  const y = Math.max(porte.y, zone.y);
  const droite = Math.min(porte.x + porte.width, zone.x + zone.width);
  const bas = Math.min(porte.y + porte.height, zone.y + zone.height);

  return {
    x,
    y,
    width: Math.max(0, droite - x),
    height: Math.max(0, bas - y)
  };
};

// Vérifie si la prochaine position entre dans un obstacle.
const collisionBloc = (x, y) => blocs.some(bloc => toucheCible(x, y, bloc));

// Oriente le personnage dans la direction de son mouvement.
const orienter = (dx, dy) => {
  if (dx || dy) {
    personnage.rotation = Math.atan2(dy, dx) * 180 / Math.PI + personnageRotation;
  }
};

// Replace le joystick et sa zone tactile à leur position d'origine.
const reinitialiserJoystick = () => {
  joystickActif = false;
  joystick.x = joystickPositionInitiale.x;
  joystick.y = joystickPositionInitiale.y;
  joystickRange.x = rangePositionInitiale.x;
  joystickRange.y = rangePositionInitiale.y;
};

// Ouvre une porte lorsque le personnage touche sa zone de collision.
const ouvrirPorteAuContact = () => {
  const porte = portes.find(porte =>
    toucheCible(personnage.x, personnage.y, zoneCollisionPorte(porte))
  );

  if (porte && porte.state !== 'Masqué') {
    reinitialiserJoystick();
    porteDeclenchee = true;
    porte.state = 'OPEN';
  }
};

// Déplace le personnage sans sortir de la zone ni traverser les obstacles.
const deplacer = (x, y) => {
  if (porteDeclenchee) {
    return;
  }

  const minX = zone.x;
  const maxX = zone.x + zone.width - personnage.width;
  const minY = zone.y;
  const maxY = zone.y + zone.height - personnage.height;

  const prochainX = limiter(x, minX, maxX);
  const prochainY = limiter(y, minY, maxY);

  if (!collisionBloc(prochainX, personnage.y)) {
    personnage.x = prochainX;
  }

  if (!collisionBloc(personnage.x, prochainY)) {
    personnage.y = prochainY;
  }

  ouvrirPorteAuContact();
};

// Interagit avec le premier objet ou PNJ assez proche.
const interagirAuContact = () => {
  if (porteDeclenchee) {
    return;
  }

  const cible = interactions.find(item =>
    toucheCible(personnage.x, personnage.y, item.obj, margeInteraction)
  );

  if (cible) {
    setVar(cible.variable, Number(getVar(cible.variable)) + 1);
  }
};

// Active le joystick pour les évènements pointeur, y compris tactiles.
const activerJoystick = () => {
  if (!porteDeclenchee && !Boolean(getVar('A_Clavier'))) {
    joystickActif = true;
  }
};

const desactiverJoystick = () => {
  reinitialiserJoystick();
};

reinitialiserJoystick();

// Empêche le navigateur de traiter le joystick comme un geste de défilement ou de zoom.
joystickRange.style.cursor = 'pointer';
joystickRange.style.touchAction = 'none';
joystick.style.touchAction = 'none';
boutonInteragir.style.cursor = 'pointer';
boutonInteragir.style.touchAction = 'manipulation';

// Le pointerdown démarre le contrôle. Le pointerup relâche le contrôle.
// Le pointerout couvre le cas où le doigt ou le pointeur sort de la zone tactile.
joystickRange.pointerdown(() => {
  activerJoystick();
});
joystickRange.pointerup(() => {
  desactiverJoystick();
});
joystickRange.pointerout(() => {
  desactiverJoystick();
});

// BTN_E : actif uniquement lorsque A_Clavier est faux.
boutonInteragir.click(() => {
  if (!Boolean(getVar('A_Clavier'))) {
    interagirAuContact();
  }
});

// Boucle principale : clavier, joystick et interaction E.
update(() => {
  if (porteDeclenchee) {
    return;
  }

  const clavierActif = Boolean(getVar('A_Clavier'));
  const touches = getKeyDown();
  let dx = 0;
  let dy = 0;

  if (clavierActif) {
    reinitialiserJoystick();

    // Déplacements ZQSD et flèches.
    dx = (touches.d || touches.D || touches.ArrowRight ? 1 : 0) -
         (touches.q || touches.Q || touches.ArrowLeft ? 1 : 0);

    dy = (touches.s || touches.S || touches.ArrowDown ? 1 : 0) -
         (touches.z || touches.Z || touches.ArrowUp ? 1 : 0);

    // Interaction E : une seule fois par appui.
    const toucheE = Boolean(touches.e || touches.E);

    if (toucheE && !toucheEEnfoncee) {
      interagirAuContact();
    }

    toucheEEnfoncee = toucheE;
  } else if (joystickActif) {
    toucheEEnfoncee = false;

    // pointerX() et pointerY() fonctionnent avec souris et contact tactile.
    joystickRange.x = pointerX() - joystickRange.width / 2;
    joystickRange.y = pointerY() - joystickRange.height / 2;

    const ecartX = pointerX() - centreJoystickInitial.x;
    const ecartY = pointerY() - centreJoystickInitial.y;
    const distance = Math.sqrt(ecartX * ecartX + ecartY * ecartY);
    const ratio = distance > rayonJoystick ? rayonJoystick / distance : 1;

    joystick.x = centreJoystickInitial.x + ecartX * ratio - joystick.width / 2;
    joystick.y = centreJoystickInitial.y + ecartY * ratio - joystick.height / 2;

    if (distance > seuilDeplacementJoystick) {
      if (Math.abs(ecartX) >= Math.abs(ecartY)) {
        dx = ecartX > 0 ? 1 : -1;
      } else {
        dy = ecartY > 0 ? 1 : -1;
      }
    }
  } else {
    toucheEEnfoncee = false;
  }

  // Applique le déplacement.
  if (dx || dy) {
    orienter(dx, dy);
    deplacer(
      personnage.x + dx * vitesse / 2,
      personnage.y + dy * vitesse / 2
    );
  }
});
}

};
