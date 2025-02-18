import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PointMapper {

    public PointEntity toEntity(PointDTO dto) {
        return new PointEntity(dto.getX(), dto.getY(), dto.getR(), dto.isStatus());
    }

    public PointDTO toDTO(PointEntity entity) {
        return new PointDTO(entity.getX(), entity.getY(), entity.getR(), entity.getStatus());
    }
}

