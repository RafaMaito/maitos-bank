import { validate as uuidValidator } from 'uuid';

export default (request, response, next) => {
    const { id, idT } = request.params;

    if (!uuidValidator(id)) {
        return response
            .status(400)
            .json({ error: 'Param sent is not a valid UUID' });
    }
    if (idT) {
        if (!uuidValidator(idT)) {
            return response
                .status(400)
                .json({ error: 'Param sent is not a valid UUID' });
        }
    }

    return next();
};
