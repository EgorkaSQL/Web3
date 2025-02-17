import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class DatabaseService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private PointMapper pointMapper;

    // Используем @Transactional для управления транзакциями
    @Transactional
    public void addPoint(PointDTO pointDTO) {
        PointEntity pointEntity = pointMapper.toEntity(pointDTO);
        entityManager.persist(pointEntity); // Здесь будет использоваться транзакция
    }

    @Transactional
    public void clearPoints() {
        // Удаляем все точки из базы
        entityManager.createQuery("DELETE FROM PointEntity p").executeUpdate();
    }

    public List<PointDTO> getAllPoints() {
        List<PointEntity> pointEntities = entityManager.createQuery("SELECT p FROM PointEntity p", PointEntity.class).getResultList();
        // Преобразуем список сущностей в список DTO
        return pointEntities.stream()
                .map(pointMapper::toDTO)
                .collect(Collectors.toList());
    }
}
