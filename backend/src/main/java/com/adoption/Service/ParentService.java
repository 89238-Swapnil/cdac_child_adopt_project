package com.adoption.Service;

import com.adoption.dto.ParentDTO;
import java.util.List;

public interface ParentService {
    ParentDTO registerParent(ParentDTO parentDTO);
    ParentDTO getParentById(Long id);
    List<ParentDTO> getAllParents();
    ParentDTO updateParent(Long id, ParentDTO parentDTO);
    void deleteParent(Long id);
}