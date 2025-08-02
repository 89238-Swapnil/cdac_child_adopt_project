package com.adoption.Service;

import com.adoption.dto.OrphanageDTO;
import java.util.List;

public interface OrphanageService {
    OrphanageDTO registerOrphanage(OrphanageDTO dto);
    OrphanageDTO getOrphanageById(Long id);
    List<OrphanageDTO> getAllOrphanages();
    OrphanageDTO updateOrphanage(Long id, OrphanageDTO dto);
    void deleteOrphanage(Long id);
}