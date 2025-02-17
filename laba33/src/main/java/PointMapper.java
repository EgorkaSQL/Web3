import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PointMapper {

    // Преобразование DTO в сущность
    public PointEntity toEntity(PointDTO dto) {
        return new PointEntity(dto.getX(), dto.getY(), dto.getR(), dto.isStatus(), false);  // hit по умолчанию false
    }

    // Преобразование сущности в DTO
    public PointDTO toDTO(PointEntity entity) {
        return new PointDTO(entity.getX(), entity.getY(), entity.getR(), entity.getStatus());  // Учитываем статус из сущности
    }
}
