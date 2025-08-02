import java.util.List;

import com.adoption.dto.ChildDTO;

public interface ChildService {
    ChildDTO addChild(ChildDTO childDTO);
    ChildDTO updateChild(Long id, ChildDTO childDTO);
    void deleteChild(Long id);
    ChildDTO getChildById(Long id);
    List<ChildDTO> getAllChildren();
    List<ChildDTO> getChildrenByOrphanage(Long orphanageId);
}